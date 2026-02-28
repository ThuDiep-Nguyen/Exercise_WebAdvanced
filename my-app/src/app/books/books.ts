import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookAPI } from '../myservices/book-api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
 books:any; 
  errMessage:string='' 
  constructor(private _service: BookAPI, private router: Router, private activeRouter: ActivatedRoute, private cd: ChangeDetectorRef){ 
  }

  ngOnInit(): void {
    this._service.getBooks().subscribe({ 
      next:(data)=>{
        this.books=data;
        this.cd.detectChanges();
      }, 
      error:(err)=>{
        this.errMessage=err;
        this.cd.detectChanges();
      } 
    }) 
  }
 
viewdetail(bookId:any)
{
  this.router.navigate(['ex41', bookId]);
}
process_remove(book:any)
{
  if (confirm("Are you sure to delete this book [" + book.BookName + "]?")) 
    {
      let bookId=book.BookId;
      this._service.deleteBook(bookId).subscribe({ 
      next:(data)=>{
        this.books=data;
        this.cd.detectChanges();
      }, 
      error:(err)=>{this.errMessage=err} 
    }) 
    }
}
} 