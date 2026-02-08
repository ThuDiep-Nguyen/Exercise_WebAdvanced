import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../myclasses/ibook';
import { BookAPI } from '../../myservices/book-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex50-new',
  standalone: false,
  templateUrl: './ex50-new.html',
  styleUrl: './ex50-new.css'
})
export class Ex50New implements OnInit {
  book = new Book();
  errMessage: string = '';
  selectedFile: File | null = null;

  constructor(private _service: BookAPI, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  postBook() {
    if (this.selectedFile) {
      this._service.uploadFile(this.selectedFile).subscribe({
        next: (res) => {
          this.book.Image = res.fileName;
          this.saveBook();
        },
        error: (err) => {
          this.errMessage = 'Upload failed: ' + err.message;
        }
      });
    } else {
      this.saveBook();
    }
  }

  saveBook() {
    if (!this.book.BookId || this.book.BookId.trim() === "") {
        this.errMessage = "Error: Book ID cannot be empty!";
        return;
    }
    this._service.postBook(this.book).subscribe({
      next: (data) => {
        this.router.navigate(['ex50']);
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
}
