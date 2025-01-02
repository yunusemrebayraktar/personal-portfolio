import os
import sqlite3
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
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
    publisher: str | None = None
    image: str | None = None
    link: str

class BookResponse(BaseModel):
    books: List[Book]
    total: int
    page: int
    per_page: int
    total_pages: int

def get_db():
    conn = sqlite3.connect('books.db')
    conn.row_factory = sqlite3.Row  # This enables column access by name
    return conn

@app.get("/api/books", response_model=BookResponse)
async def get_books(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=50)
):
    try:
        conn = get_db()
        cursor = conn.cursor()

        # Get total count
        cursor.execute('SELECT COUNT(*) FROM books')
        total_books = cursor.fetchone()[0]

        # Get paginated books
        cursor.execute('''
            SELECT title, author, publisher, image, link
            FROM books
            ORDER BY id DESC
            LIMIT ? OFFSET ?
        ''', (per_page, (page - 1) * per_page))
        
        books = [
            Book(
                title=row['title'],
                author=row['author'],
                publisher=row['publisher'],
                image=row['image'],
                link=row['link']
            )
            for row in cursor.fetchall()
        ]

        conn.close()

        return BookResponse(
            books=books,
            total=total_books,
            page=page,
            per_page=per_page,
            total_pages=(total_books + per_page - 1) // per_page
        )

    except Exception as e:
        print(f"Error in get_books: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("Starting server on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000) 