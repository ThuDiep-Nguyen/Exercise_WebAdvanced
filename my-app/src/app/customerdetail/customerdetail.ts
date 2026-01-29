import { Component } from '@angular/core';
import { Customerservice } from '../customerservice';

@Component({
  selector: 'app-customerdetail',
  standalone: false,
  templateUrl: './customerdetail.html',
  styleUrl: './customerdetail.css',
})
export class Customerdetail {
  // Biến để lưu thông tin khách hàng tìm được
  selectedCustomer: any = null;

  constructor(private cs: Customerservice) {}

  search_customer_by_id(id: string) {
    let c = this.cs.get_customer_detail(id);
    if (c != null) {
      this.selectedCustomer = c;
    } else {
      this.selectedCustomer = null;
      alert("Không tìm thấy thông tin khách hàng");
    }
  }
}
