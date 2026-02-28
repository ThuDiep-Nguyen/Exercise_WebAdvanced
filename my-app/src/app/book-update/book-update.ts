import { ChangeDetectorRef, Component } from '@angular/core';
import { BookAPI } from '../myservices/book-api';
import { Book } from '../myclasses/ibook';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-update',
  standalone: false,
  templateUrl: './book-update.html',
  styleUrl: './book-update.css',
})
export class BookUpdate {
  book=new Book(); 
  books:any 
  errMessage:string='' 
  constructor(private _service: BookAPI,
    private router: Router, 
     private activeRouter: ActivatedRoute,
     private cd: ChangeDetectorRef){ 
   }
   ngOnInit(): void {
     this.activeRouter.paramMap.subscribe((param)=>{
       let id=param.get("id")
       if (id!=null){
         this.searchBook(id)
       }
     })
   } 
   searchBook(bookId:string) 
   { 
     this._service.getBook(bookId).subscribe({ 
       next:(data)=>{
         this.book=data;
         this.cd.detectChanges();
       }, 
       error:(err)=>{
         this.errMessage=err;
         this.cd.detectChanges();
       } 
     }) 
   } 
    viewdetail(id:string)
  {
    this._service.getBook(id).subscribe({
      next:(data)=>{this.book=data},
      error:(err)=>{this.errMessage=err}
    })
  } 
  putBook() 
  { 
    this._service.putBook(this.book).subscribe({ 
      next:(data)=>{this.books=data}, 
      error:(err)=>{this.errMessage=err} 
    }) 
  } 
} 