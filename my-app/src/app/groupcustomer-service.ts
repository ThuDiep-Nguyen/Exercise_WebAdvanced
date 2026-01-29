import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Định nghĩa Model dữ liệu ngay đây để dùng chung
export interface Customer {
  Id: string;
  Name: string;
  Email: string;
  Age: number;
  Image: string;
}

export interface CustomerGroup {
  CustomerTypeId: number;
  CustomerTypeName: string;
  Customers: Customer[];
}

@Injectable({
  providedIn: 'root',
})
export class GroupcustomerService {
  // Đường dẫn đến file JSON (bạn nhớ tạo file này trong assets/data/)
  private url = '/assets/data/customer.json';

  constructor(private http: HttpClient) {}

  // Hàm lấy dữ liệu trả về Observable
  getCustomerGroups(): Observable<CustomerGroup[]> {
    return this.http.get<CustomerGroup[]>(this.url);
  }
}