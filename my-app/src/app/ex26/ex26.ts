import { Component } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
  selector: 'app-ex26',
  standalone: false,
  templateUrl: './ex26.html',
  styleUrl: './ex26.css',
})
export class EX26 {
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
