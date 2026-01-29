import { Component } from '@angular/core';
import { BookAPI } from '../myservices/book-api';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
 books:any; 
  errMessage:string='' 
  constructor(private _service: BookAPI){ 
    this._service.getBooks().subscribe({ 
      next:(data)=>{this.books=data}, 
      error:(err)=>{this.errMessage=err} 
    }) 
  } 
} 