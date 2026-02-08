import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookAPI } from '../myservices/book-api';
import { IBook } from '../myclasses/ibook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex50',
  standalone: false,
  templateUrl: './ex50.html',
  styleUrl: './ex50.css'
})
export class Ex50 implements OnInit {
  books: any;
  errMessage: string = "";

  constructor(private _service: BookAPI, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err;
        this.cdr.detectChanges();
      }
    });
  }

  deleteBook(book: any) {
    if (confirm(`Are you sure you want to delete ${book.BookName}?`)) {
      // Check for empty, null, undefined, or whitespace-only strings
      if(!book.BookId || book.BookId.toString().trim() === ""){
        alert("Error: Cannot delete this book because it has no valid ID/BookId!\nPlease restart the server to clear this invalid data.");
        return;
      }
      this._service.deleteBook(book.BookId).subscribe({
        next: (data) => {
          this.books = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errMessage = err;
        }
      });
    }
  }
}
