import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FashionApiService } from '../myservices/fashion-api-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail implements OnInit {
  fashion: any;
  errMessage: string = '';
  searchId: string = '';

  constructor(
    private _service: FashionApiService,
    private activeRouter: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchId = id;
        this.searchFashion(id);
      }
    });
  }

  searchFashion(id: string) {
    this._service.getFashion(id).subscribe({
      next: (data) => {
        this.fashion = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.errMessage = err;
        this.cd.detectChanges();
      },
    });
  }

  parse_image(base64str: string) {
    let prefix = 'data:image/jpeg;base64,';
    if (base64str == null) return '';
    if (base64str.startsWith(prefix)) return base64str;
    return prefix + base64str;
  }
}