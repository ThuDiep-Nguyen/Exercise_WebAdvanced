import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../myclasses/ibook';
import { BookAPI } from '../../myservices/book-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ex50-detail',
  standalone: false,
  templateUrl: './ex50-detail.html',
  styleUrl: './ex50-detail.css'
})
export class Ex50Detail implements OnInit {
  book = new Book();
  errMessage: string = '';

  constructor(
    private _service: BookAPI, 
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
}
