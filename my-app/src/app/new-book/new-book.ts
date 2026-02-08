import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Book } from '../myclasses/ibook';
import { BookAPI } from '../myservices/book-api';

@Component({
  selector: 'app-new-book',
  standalone: false,
  templateUrl: './new-book.html',
  styleUrl: './new-book.css',
})
export class NewBook implements OnInit {
  book = new Book();
  books: any;
  errMessage: string = '';
  selectedFile: File | null = null;

  constructor(private _service: BookAPI, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
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
        },
      });
    } else {
      this.saveBook();
    }
  }

  saveBook() {
    this._service.postBook(this.book).subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
}
