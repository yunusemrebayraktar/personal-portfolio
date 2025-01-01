import os
import sys
import json
import site
import subprocess

# Activate virtual environment
def activate_venv():
    venv_path = os.path.join(os.path.dirname(__file__), 'venv')
    if sys.platform == 'win32':
        activate_script = os.path.join(venv_path, 'Scripts', 'activate.bat')
        site_packages = os.path.join(venv_path, 'Lib', 'site-packages')
    else:
        activate_script = os.path.join(venv_path, 'bin', 'activate')
        site_packages = os.path.join(venv_path, 'lib', 'python3.12', 'site-packages')
    
    if os.path.exists(site_packages):
        site.addsitedir(site_packages)
        sys.path.insert(0, site_packages)
    else:
        print("Virtual environment not found. Please create it first.")
        sys.exit(1)

# Activate the virtual environment
activate_venv()

import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

class Book(BaseModel):
    title: str
    author: str
    publisher: Optional[str] = None
    image: Optional[str] = None
    link: str

def load_book_urls():
    try:
        # Read URLs from text file
        txt_path = os.path.join(os.path.dirname(__file__), 'book_urls.txt')
        with open(txt_path, 'r', encoding='utf-8') as f:
            # Read lines and filter out empty ones
            urls = [line.strip() for line in f.readlines() if line.strip()]
            print(f"Loaded {len(urls)} URLs from {txt_path}")
            return urls
    except Exception as e:
        print(f"Error loading book URLs: {str(e)}")
        return []

async def fetch_book_details(url: str) -> Optional[Book]:
    print(f"\nFetching details for: {url}")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    }
    
    try:
        response = requests.get(url, headers=headers, verify=False)
        response.raise_for_status()
        response.encoding = 'utf-8'
        
        soup = BeautifulSoup(response.text, 'lxml')
        
        # Try different selectors
        title = (
            soup.select_one('div.product-heading h1') or
            soup.select_one('div.pr_header__heading') or
            soup.select_one('h1.pr_header__heading') or
            soup.select_one('div.product-info h1')
        )
        
        author = (
            soup.select_one('div.manufacturer span[itemprop="name"]') or
            soup.select_one('div.pr_producers__manufacturer span[itemprop="name"]') or
            soup.select_one('div.manufacturer a') or
            soup.select_one('a[href*="/yazar/"]')
        )
        
        publisher = (
            soup.select_one('div.publisher span[itemprop="name"]') or
            soup.select_one('div.pr_producers__publisher span[itemprop="name"]') or
            soup.select_one('div.publisher a') or
            soup.select_one('a[href*="/yayinevi/"]')
        )
        
        # Find the image URL by looking for the book cover link
        image_url = None
        try:
            # Look for the book cover link with the correct class
            cover_link = soup.select_one('a.js-jbox-book-cover')
            if cover_link:
                # Get the image element inside the link
                image = cover_link.find('img', id='js-book-cover')
                if image and image.get('src'):
                    image_url = image.get('src')
                    print(f"Found image URL from book cover: {image_url}")
            
            if not image_url:
                print("Could not find book cover image")
            
        except Exception as e:
            print(f"Error finding image: {str(e)}")
            image_url = None
        
        print("\nFound elements:")
        print(f"Title: {title.text.strip() if title else 'Not found'}")
        print(f"Author: {author.text.strip() if author else 'Not found'}")
        print(f"Publisher: {publisher.text.strip() if publisher else 'Not found'}")
        print(f"Image URL: {image_url}")
        
        if not (title and author):
            print("Could not find required elements")
            return None
            
        return Book(
            title=title.text.strip(),
            author=author.text.strip(),
            publisher=publisher.text.strip() if publisher else None,
            image=image_url,
            link=url
        )
        
    except Exception as e:
        print(f"Error fetching book details: {str(e)}")
        return None

@app.get("/api/books", response_model=List[Book])
async def get_books():
    book_urls = load_book_urls()
    if not book_urls:
        raise HTTPException(status_code=500, detail="Failed to load book URLs")
    
    books = []
    for url in book_urls:
        book = await fetch_book_details(url)
        if book:
            books.append(book)
            print(f"Successfully fetched: {book.title}")
        else:
            print(f"Failed to fetch book from: {url}")
    
    return list(reversed(books))  # Return newest books first

if __name__ == "__main__":
    import uvicorn
    print("Starting server on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000) 