import os
import sqlite3
import requests
from bs4 import BeautifulSoup
import random
import time
from datetime import datetime
import urllib3
import re

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def setup_database():
    conn = sqlite3.connect('books.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            publisher TEXT,
            image TEXT,
            link TEXT UNIQUE,
            last_updated TIMESTAMP
        )
    ''')
    conn.commit()
    return conn

def get_browser_headers():
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
    }

def clean_title(title: str) -> str:
    # Remove any text within parentheses
    cleaned_title = re.sub(r'\s*\([^)]*\)', '', title)
    # Remove multiple spaces
    return ' '.join(cleaned_title.split())

def fetch_book(session: requests.Session, url: str, retries: int = 3):
    headers = get_browser_headers()
    
    # Visit homepage only once per session
    if not getattr(session, 'visited_homepage', False):
        try:
            print("First time visit to homepage to get cookies...")
            session.get('https://www.kitapyurdu.com', headers=headers, verify=False)
            session.visited_homepage = True
            time.sleep(1)
        except Exception as e:
            print(f"Error visiting homepage: {str(e)}")

    for attempt in range(retries):
        try:
            if attempt > 0:
                delay = random.uniform(2, 4)
                print(f"Waiting {delay:.2f} seconds before retry...")
                time.sleep(delay)

            headers['Referer'] = 'https://www.kitapyurdu.com/index.php?route=product/search'
            response = session.get(url, headers=headers, verify=False, timeout=30)
            
            if response.status_code == 403:
                print(f"403 Forbidden on attempt {attempt + 1}")
                continue

            if response.status_code != 200:
                print(f"Status {response.status_code} on attempt {attempt + 1}")
                continue

            soup = BeautifulSoup(response.text, 'lxml')

            # Title selectors
            title_elem = (
                soup.select_one('h1.pr_header__heading') or
                soup.select_one('div.pr_header__heading') or
                soup.select_one('div.product-heading h1') or
                soup.select_one('div.product-info h1')
            )
            
            # Author selectors
            author_elem = (
                soup.select_one('div.pr_producers__manufacturer span[itemprop="name"]') or
                soup.select_one('div.manufacturer span[itemprop="name"]') or
                soup.select_one('div.manufacturer a') or
                soup.select_one('a[href*="/yazar/"]')
            )
            
            # Publisher selectors
            publisher_elem = (
                soup.select_one('div.pr_producers__publisher span[itemprop="name"]') or
                soup.select_one('div.publisher span[itemprop="name"]') or
                soup.select_one('div.publisher a') or
                soup.select_one('a[href*="/yayinevi/"]')
            )

            # Try multiple image selectors
            image_url = None
            
            # Method 1: Direct book cover image
            image_elem = (
                soup.select_one('a.js-jbox-book-cover img#js-book-cover') or
                soup.select_one('img#js-book-cover') or
                soup.select_one('div.image img[alt*="kapak"]') or
                soup.select_one('div.product-image img') or
                soup.select_one('div.pr_images__item img')
            )
            if image_elem and image_elem.get('src'):
                image_url = image_elem.get('src')
            
            # Method 2: Look for data attributes
            if not image_url:
                image_elem = soup.select_one('[data-src], [data-image], [data-original]')
                if image_elem:
                    image_url = (
                        image_elem.get('data-src') or
                        image_elem.get('data-image') or
                        image_elem.get('data-original')
                    )
            
            # Method 3: Look for image in meta tags
            if not image_url:
                meta_image = soup.select_one('meta[property="og:image"]')
                if meta_image:
                    image_url = meta_image.get('content')

            # Method 4: Try to construct image URL from product ID
            if not image_url:
                product_id = None
                # Try to extract product ID from URL or page content
                if 'kitap/' in url and '/' in url.split('kitap/')[-1]:
                    product_id = url.split('kitap/')[-1].split('/')[1].split('.')[0]
                if product_id:
                    image_url = f'https://img.kitapyurdu.com/v1/getImage/fn:{product_id}/wh:true/wi:800'

            if not (title_elem and author_elem):
                print("Missing required elements")
                continue

            # Clean the title before saving
            title = clean_title(title_elem.text.strip())

            book_data = {
                'title': title,
                'author': author_elem.text.strip(),
                'publisher': publisher_elem.text.strip() if publisher_elem else None,
                'image': image_url,
                'link': url
            }

            print(f"Successfully fetched: {book_data['title']}")
            if not image_url:
                print(f"Warning: No image found for {book_data['title']}")
            return book_data

        except requests.Timeout:
            print(f"Timeout on attempt {attempt + 1}")
        except Exception as e:
            print(f"Error on attempt {attempt + 1}: {str(e)}")

    print(f"Failed to fetch {url} after {retries} attempts")
    return None

def update_database():
    conn = setup_database()
    cursor = conn.cursor()

    # Load URLs
    with open('book_urls.txt', 'r', encoding='utf-8') as f:
        urls = [line.strip() for line in f if line.strip()]

    # Get existing book URLs
    cursor.execute('SELECT link FROM books')
    existing_urls = {row[0] for row in cursor.fetchall()}
    
    # Filter out existing URLs
    new_urls = [url for url in urls if url not in existing_urls]
    
    if not new_urls:
        print("No new books to fetch!")
        conn.close()
        return
        
    print(f"Found {len(new_urls)} new books to fetch")

    # Process URLs in batches
    batch_size = 5
    session = requests.Session()
    
    for i in range(0, len(new_urls), batch_size):
        batch_urls = new_urls[i:i + batch_size]
        print(f"\nProcessing batch {i//batch_size + 1} ({len(batch_urls)} URLs)")

        for url in batch_urls:
            book_data = fetch_book(session, url)
            
            if book_data:
                # Insert new book
                cursor.execute('''
                    INSERT INTO books 
                    (title, author, publisher, image, link, last_updated)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (
                    book_data['title'],
                    book_data['author'],
                    book_data['publisher'],
                    book_data['image'],
                    book_data['link'],
                    datetime.now().isoformat()
                ))
                conn.commit()
            
            # Shorter delay between successful fetches
            time.sleep(random.uniform(1, 2))

        # Shorter delay between batches
        if i + batch_size < len(new_urls):
            time.sleep(random.uniform(2, 4))

    conn.close()
    print("Database update completed")

if __name__ == "__main__":
    update_database() 