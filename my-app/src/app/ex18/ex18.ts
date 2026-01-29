import { Component, OnInit } from '@angular/core';
import { CustomerGroup, GroupcustomerService } from '../groupcustomer-service';

@Component({
  selector: 'app-ex18',
  standalone: false,
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class EX18 implements OnInit {  // Thêm implements OnInit
  customerGroups: CustomerGroup[] = [];

  constructor(private groupService: GroupcustomerService) {}

  ngOnInit(): void {
    this.groupService.getCustomerGroups().subscribe({
      next: (data) => {
        this.customerGroups = data;
        console.log('Dữ liệu đã tải:', this.customerGroups);
      },
      error: (err) => {
        console.error('Lỗi khi tải data:', err);
      }
    });
  }
}