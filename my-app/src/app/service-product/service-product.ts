import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-product',
  standalone: false,
  templateUrl: './service-product.html',
  styleUrl: './service-product.css',
})
export class ServiceProduct {
 services = [
    { id: 'S1', name: 'Giao hàng tận nơi nội thành', price: 15 },
    { id: 'S2', name: 'Giao hàng hỏa tốc trong 30 phút', price: 25 },
    { id: 'S3', name: 'Miễn phí giao hàng (đơn từ 100)', price: 0 },
    { id: 'S4', name: 'Đóng gói quà tặng', price: 100 },
    { id: 'S5', name: 'Đá viên miễn phí', price: 0 },
    { id: 'S6', name: 'Thêm chanh/muối', price: 5 },
    { id: 'S7', name: 'Pha chế đồ uống theo yêu cầu', price: 20 }
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