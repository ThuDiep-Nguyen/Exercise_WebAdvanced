import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  standalone: false,
  templateUrl: './productdetail.html',
  styleUrl: './productdetail.css',
})
export class Productdetail {
  products=[
    {"id":"p1", "name":"Coca","price":18, "image":"https://cdn.tgdd.vn/Products/Images/2443/76451/bhx/nuoc-ngot-coca-cola-lon-320ml-202304131107525481.jpg"},
    {"id":"p2", "name":"Pepsi","price":15, "image":"https://cdn.tgdd.vn/Products/Images/2443/76467/bhx/nuoc-ngot-pepsi-cola-lon-320ml-202407131656260952.jpg"},
    {"id":"p3", "name":"Redbull","price":13, "image":"https://cdn.tgdd.vn/Products/Images/3226/76513/bhx/nuoc-tang-luc-redbull-lon-250ml-15112018162747.JPG"},
    {"id":"p4", "name":"Aqua","price":-8, "image":"https://cdn.tgdd.vn/Products/Images/2563/79247/bhx/nuoc-tinh-khiet-aquafina-500ml-202407121618240191.jpg"},
    {"id":"p5", "name":"Lavie","price":-9, "image":"https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/2563/76401/bhx/slide-2_202410161047222495.jpg"}
  ];

  product_selected:any
  constructor(private router:Router,private activeRouter:ActivatedRoute)
  {
    //dùng router để điều hướng
    //dùng activeRouter để nhận điều hướng
    activeRouter.paramMap.subscribe((param)=>{
      let id=param.get("id")
      this.product_selected=this.products.find(p=>p.id==id)
    })
  }
  goback()
  {
    this.router.navigate(["san-pham-1",{id:this.product_selected.id}])
  }
}
