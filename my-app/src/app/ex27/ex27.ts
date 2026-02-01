import { Component } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
  selector: 'app-ex27',
  standalone: false,
  templateUrl: './ex27.html',
  styleUrl: './ex27.css',
})
export class Ex27 {
 data:any
  errMessage:string=''
  constructor(_service:FakeProductService){
  _service.getFakeProductData().subscribe({
  next:(data)=>{ this.data=data},
  error:(err)=>{
  this.errMessage=err
  }
  })
  }
}
