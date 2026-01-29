import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
products = [
    {"id":"p1", "name":"Coca"},
    {"id":"p2", "name":"Pepsi"},
    {"id":"p3", "name":"Redbull"},
    {"id":"p4", "name":"Aqua"},
    {"id":"p5", "name":"Lavie"},
  ];
  selected_id:any
  constructor(private router:Router,private activeRouter:ActivatedRoute)
  {
    //dùng router để điều hướng
    //dùng activeRouter để nhận điều hướng
    activeRouter.paramMap.subscribe((param)=>{
      this.selected_id=param.get("id")
    })
  }
}