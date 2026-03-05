import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DiamondProductsApiService } from '../myservices/diamond-products-api-service';

@Component({
  selector: 'app-ex63cart',
  standalone: false,
  templateUrl: './ex63cart.html',
  styleUrl: './ex63cart.css',
})
export class Ex63cart implements OnInit {
  cart: any[] = [];
  checkedItems: boolean[] = [];
  errMessage: string = '';
  successMessage: string = '';

  constructor(
    private _service: DiamondProductsApiService,
    private _router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this._service.getCart().subscribe({
      next: (data) => {
        this.cart = data;
        this.checkedItems = data.map(() => false);
        this.cd.detectChanges();
      },
      error: (err) => {
        this.errMessage = 'Failed to load cart: ' + (err.message || '');
        this.cd.detectChanges();
      },
    });
  }

  getTotal(item: any): number {
    return item.price * (item.qty || 1);
  }

  getGrandTotal(): number {
    return this.cart.reduce((sum, item) => sum + this.getTotal(item), 0);
  }

  updateCart(): void {
    const updatedCart = this.cart.filter((_, i) => !this.checkedItems[i]);
    updatedCart.forEach(item => {
      if (!item.qty || item.qty < 1) item.qty = 1;
    });
    this._service.updateCart(updatedCart).subscribe({
      next: () => {
        this.successMessage = 'Cart updated successfully!';
        this.cart = updatedCart;
        this.checkedItems = updatedCart.map(() => false);
        this.cd.detectChanges();
        setTimeout(() => { this.successMessage = ''; this.cd.detectChanges(); }, 2000);
      },
      error: (err) => {
        this.errMessage = 'Update failed: ' + (err.message || '');
        this.cd.detectChanges();
      },
    });
  }

  continueShopping(): void {
    this._router.navigate(['/ex63']);
  }

  parse_image(base64str: string): string {
    const prefix = 'data:image/jpeg;base64,';
    if (!base64str) return '';
    if (base64str.startsWith(prefix)) return base64str;
    return prefix + base64str;
  }
}
