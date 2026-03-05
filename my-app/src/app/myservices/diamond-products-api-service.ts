import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3002';
const CRED = { withCredentials: true };

@Injectable({
  providedIn: 'root',
})
export class DiamondProductsApiService {

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this._http.get<any[]>(`${API_URL}/ex63products`);
  }

  getCart(): Observable<any[]> {
    return this._http.get<any[]>(`${API_URL}/ex63cart`, CRED);
  }

  addToCart(product: any): Observable<any> {
    return this._http.post<any>(`${API_URL}/ex63cart/add`, product, CRED);
  }

  updateCart(updatedCart: any[]): Observable<any> {
    return this._http.put<any>(`${API_URL}/ex63cart/update`, { updatedCart }, CRED);
  }

  clearCart(): Observable<any> {
    return this._http.delete<any>(`${API_URL}/ex63cart/clear`, CRED);
  }
}

