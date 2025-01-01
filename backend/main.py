import os
import sys
import site
import socket
import aiohttp
from bs4 import BeautifulSoup
import json
import asyncio

# Activate virtual environment
VENV_PATH = os.path.join(os.path.dirname(__file__), 'venv')
if os.path.exists(VENV_PATH):
    # Get the site-packages directory
    if sys.platform == 'win32':
        site_packages = os.path.join(VENV_PATH, 'Lib', 'site-packages')
    else:
        site_packages = os.path.join(VENV_PATH, 'lib', 'python%s' % sys.version[:3], 'site-packages')
    
    # Add to Python path
    sys.path.insert(0, site_packages)

try:
    from fastapi import FastAPI, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    from typing import List, Optional
    from pydantic import BaseModel
except ImportError:
    print("Error: Required packages not found. Please run:")
    print("cd backend")
    print("python -m venv venv")
    print("./venv/Scripts/activate  # On Windows")
    print("pip install -r requirements.txt")
    sys.exit(1)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],  # Only allow GET requests
    allow_headers=["*"],
)

class Book(BaseModel):
    title: str
    author: str
    image: Optional[str] = None
    link: Optional[str] = None
    publisher: Optional[str] = None
    isbn: Optional[str] = None

# Store books in a JSON file for caching
BOOKS_FILE = os.path.join(os.path.dirname(__file__), "books.json")
BOOK_URLS_FILE = os.path.join(os.path.dirname(__file__), "books.txt")

def load_book_urls() -> List[str]:
    try:
        with open(BOOK_URLS_FILE, 'r', encoding='utf-8') as f:
            urls = [line.strip() for line in f if line.strip()]
            print(f"Loaded {len(urls)} URLs from {BOOK_URLS_FILE}")
            return urls
    except FileNotFoundError:
        print(f"Could not find {BOOK_URLS_FILE}")
        print("Current directory:", os.getcwd())
        print("File should be at:", os.path.abspath(BOOK_URLS_FILE))
        return []
    except Exception as e:
        print(f"Error loading book URLs: {str(e)}")
        return []

def load_cached_books() -> List[Book]:
    if os.path.exists(BOOKS_FILE):
        with open(BOOKS_FILE, 'r', encoding='utf-8') as f:
            books_data = json.load(f)
            return [Book(**book) for book in books_data]
    return []

def save_cached_books(books: List[Book]):
    with open(BOOKS_FILE, 'w', encoding='utf-8') as f:
        json.dump([book.dict() for book in books], f, ensure_ascii=False, indent=2)

async def fetch_book_details(url: str, max_retries: int = 3) -> Optional[Book]:
    print(f"Fetching details for: {url}")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
        'Referer': 'https://www.kitapyurdu.com/',
        'Cache-Control': 'no-cache'
    }
    
    for attempt in range(max_retries):
        try:
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.get(url) as response:
                    if response.status != 200:
                        print(f"Failed to fetch URL (attempt {attempt + 1}/{max_retries}): {response.status}")
                        if attempt + 1 < max_retries:
                            await asyncio.sleep(1)  # Wait before retrying
                            continue
                        return None
                    
                    html = await response.text()
                    if not html:
                        print("Received empty HTML")
                        return None
                        
                    soup = BeautifulSoup(html, 'lxml')
                    
                    # Print the first part of HTML for debugging
                    print("HTML snippet:", html[:1000])
                    
                    # Updated selectors based on current inspection
                    title_elem = soup.select_one('.product-info-title h1')
                    author_elem = soup.select_one('.product-info-authors a')
                    image_elem = soup.select_one('.product-info-image img')
                    publisher_elem = soup.select_one('.product-info-publisher a')

                    # Debug prints
                    print("Found elements:")
                    print(f"Title: {title_elem.text.strip() if title_elem else 'Not found'}")
                    print(f"Author: {author_elem.text.strip() if author_elem else 'Not found'}")
                    print(f"Image: {image_elem.get('src') if image_elem else 'Not found'}")
                    print(f"Publisher: {publisher_elem.text.strip() if publisher_elem else 'Not found'}")

                    if not title_elem:
                        print("Could not find title element")
                        if attempt + 1 < max_retries:
                            await asyncio.sleep(1)  # Wait before retrying
                            continue
                        return None

                    return Book(
                        title=title_elem.text.strip(),
                        author=author_elem.text.strip() if author_elem else "Unknown Author",
                        image=image_elem.get('src') if image_elem else None,
                        link=url,
                        publisher=publisher_elem.text.strip() if publisher_elem else None
                    )
        except Exception as e:
            print(f"Error fetching book details (attempt {attempt + 1}/{max_retries}): {str(e)}")
            print(f"URL: {url}")
            import traceback
            traceback.print_exc()
            if attempt + 1 < max_retries:
                await asyncio.sleep(1)  # Wait before retrying
                continue
            return None
    
    return None  # Return None if all retries failed

@app.get("/api/books", response_model=List[Book])
async def get_books():
    print("Loading books...")
    # Try to load from cache first
    cached_books = load_cached_books()
    if cached_books:
        print(f"Returning {len(cached_books)} books from cache")
        return list(reversed(cached_books))
    
    # If no cache, fetch all books
    print("No cache found, fetching books from URLs...")
    book_urls = load_book_urls()
    print(f"Found {len(book_urls)} URLs to fetch")
    
    books = []
    for url in book_urls:
        book = await fetch_book_details(url)
        if book:
            books.append(book)
            print(f"Successfully fetched book: {book.title}")
        else:
            print(f"Failed to fetch book from URL: {url}")
    
    print(f"Successfully fetched {len(books)} books")
    
    # Cache the results
    if books:
        print("Saving books to cache...")
        save_cached_books(books)
    
    return list(reversed(books))

if __name__ == "__main__":
    def find_free_port():
        ports = [8000, 8001, 8002, 8003, 8004]
        for port in ports:
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.bind(('', port))
                    return port
            except OSError:
                continue
        raise OSError("No free ports found")

    try:
        port = find_free_port()
        print(f"Starting server on port {port}")
        import uvicorn
        uvicorn.run(app, host="0.0.0.0", port=port)
    except Exception as e:
        print(f"Error starting server: {e}") 