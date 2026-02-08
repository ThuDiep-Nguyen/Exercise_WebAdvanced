import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../myclasses/ibook';
import { BookAPI } from '../../myservices/book-api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ex50-edit',
  standalone: false,
  templateUrl: './ex50-edit.html',
  styleUrl: './ex50-edit.css'
})
export class Ex50Edit implements OnInit {
  book = new Book();
  errMessage: string = '';
  selectedFile: File | null = null;

  constructor(
    private _service: BookAPI, 
    private router: Router, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
        this._service.getBook(id).subscribe({
            next: (data) => {
                this.book = data;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.errMessage = err;
            }
        })
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  updateBook() {
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
    this._service.putBook(this.book).subscribe({
      next: (data) => {
        this.router.navigate(['ex50']);
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
}
