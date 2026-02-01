import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  
  private _url:string="/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp"
  constructor(private _http: HttpClient) { }
  getBitcoinData():Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
    }
    return this._http.get<any>(this._url,requestOptions).pipe(
    map(res=>{
      const data = JSON.parse(res);
      return {
        chartName: "Bitcoin",
        time: { 
          updated: new Date().toString(),
        },
        disclaimer: "Data powered by CoinGecko",
        bpi: {
          USD: {
            code: 'USD',
            symbol: '&#36;',
            description: 'United States Dollar',
            rate: data.bitcoin.usd.toLocaleString(),
            rate_float: data.bitcoin.usd
          },
          EUR: {
            code: 'EUR',
            symbol: '&euro;',
            description: 'Euro',
            rate: data.bitcoin.eur.toLocaleString(),
            rate_float: data.bitcoin.eur
          },
          GBP: {
            code: 'GBP',
            symbol: '&pound;',
            description: 'British Pound Sterling',
            rate: data.bitcoin.gbp.toLocaleString(),
            rate_float: data.bitcoin.gbp
          }
        }
      };
    }),
    retry(3),
    catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
