import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
  selector: 'app-fake-product',
  standalone: false,
  templateUrl: './fake-product.html',
  styleUrl: './fake-product.css',
})
export class FakeProduct implements OnInit {
  data:any
  errMessage:string=''
  constructor(private _service:FakeProductService, private cd: ChangeDetectorRef){
  }

  ngOnInit(): void {
    this._service.getFakeProductData().subscribe({
      next:(data)=>{ 
        this.data=data;
        this.cd.detectChanges();
      },
      error:(err)=>{
        this.errMessage=err;
        this.cd.detectChanges();
      }
      })
  }
}
