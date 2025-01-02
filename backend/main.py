import os
import sqlite3
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import math

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

@app.get("/api/books")
async def get_books(page: int = 1, search: str = None):
    per_page = 12
    offset = (page - 1) * per_page
    
    try:
        conn = sqlite3.connect('books.db')
        cursor = conn.cursor()
        
        # Base query
        query = "SELECT * FROM books"
        count_query = "SELECT COUNT(*) FROM books"
        params = []
        
        # Add search condition if search parameter is provided
        if search:
            search = f"%{search}%"
            query += " WHERE title LIKE ? OR author LIKE ? OR publisher LIKE ?"
            count_query += " WHERE title LIKE ? OR author LIKE ? OR publisher LIKE ?"
            params.extend([search, search, search])
        
        # Add sorting
        query += " ORDER BY id DESC"
        
        # Get total count for pagination
        cursor.execute(count_query, params)
        total_count = cursor.fetchone()[0]
        total_pages = math.ceil(total_count / per_page)
        
        # Add pagination
        query += " LIMIT ? OFFSET ?"
        params.extend([per_page, offset])
        
        # Execute final query
        cursor.execute(query, params)
        books = cursor.fetchall()
        
        # Convert to list of dictionaries
        books_list = []
        for book in books:
            books_list.append({
                "id": book[0],
                "title": book[1],
                "author": book[2],
                "publisher": book[3],
                "image": book[4],
                "link": book[5]
            })
        
        return {
            "books": books_list,
            "total_pages": total_pages,
            "current_page": page
        }
        
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    import uvicorn
    print("Starting server on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000) 