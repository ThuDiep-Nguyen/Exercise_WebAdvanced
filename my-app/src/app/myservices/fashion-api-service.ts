import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../myclasses/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionApiService {
  
  constructor(private _http: HttpClient) { }
  getFashions():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:3002/fashions",requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<Fashion>),
  retry(3),
  catchError(this.handleError))
  }
  getFashion(id:string):Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>(`http://localhost:3002/fashions/${id}`,requestOptions).pipe(
  map(res=>JSON.parse(res) as Fashion),
  retry(3),
  catchError(this.handleError))
  }
  login(user: string, pwd: string): Observable<any> {
    return this._http.post<any>('http://localhost:3002/login', { user, pwd }).pipe(
      catchError(this.handleError)
    );
  }

  register(user: string, pwd: string): Observable<any> {
    return this._http.post<any>('http://localhost:3002/register', { user, pwd }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    const msg = error.error?.message || error.message || 'An error occurred. Please try again.';
    return throwError(() => new Error(msg));
  }
}