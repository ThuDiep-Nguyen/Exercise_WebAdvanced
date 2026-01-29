import { Component } from '@angular/core';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex13',
  standalone: false,
  templateUrl: './ex13.html',
  styleUrl: './ex13.css',
})
export class EX13 {
 public products:any 
  constructor(pservice: ProductService,private router:Router){ 
    this.products=pservice.getProductsWithImages() 
  } 
  viewDetail(f:any) 
  { 
    this.router.navigate(['ex13',f.ProductId]) 
  } 
}