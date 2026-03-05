import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DiamondProductsApiService } from '../myservices/diamond-products-api-service';

@Component({
  selector: 'app-ex63',
  standalone: false,
  templateUrl: './ex63.html',
  styleUrl: './ex63.css',
})
export class Ex63 implements OnInit {
  products: any[] = [];
  errMessage: string = '';
  successMessage: string = '';

  constructor(
    private _service: DiamondProductsApiService,
    private _router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.errMessage = 'Failed to load products: ' + (err.message || '');
        this.cd.detectChanges();
      },
    });
  }

  addToCart(product: any): void {
    this._service.addToCart(product).subscribe({
      next: () => {
        this.successMessage = `"${product.name}" added to cart!`;
        this.cd.detectChanges();
        setTimeout(() => { this.successMessage = ''; this.cd.detectChanges(); }, 2000);
      },
      error: (err) => {
        this.errMessage = 'Failed to add to cart: ' + (err.message || '');
        this.cd.detectChanges();
      },
    });
  }

  viewCart(): void {
    this._router.navigate(['/ex63cart']);
  }

  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  parse_image(base64str: string): string {
    const prefix = 'data:image/jpeg;base64,';
    if (!base64str) return '';
    if (base64str.startsWith(prefix)) return base64str;
    return prefix + base64str;
  }
}
