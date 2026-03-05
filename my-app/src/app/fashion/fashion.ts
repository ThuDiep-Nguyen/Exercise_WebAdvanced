import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FashionApiService } from '../myservices/fashion-api-service';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})
export class Fashion implements OnInit {
  fashions: any;
  errMessage: string = '';

  constructor(public _service: FashionApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message || 'Lỗi kết nối server';
        this.cd.detectChanges();
      }
    });
  }
  parse_image(base64str:string)
  {
    let prefix="data:image/jpeg;base64,"
    if(base64str==null)
      return ""
    if (base64str.startsWith(prefix))
      return base64str
    return prefix+base64str
  }
}