import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Customerservice {
  customers=[
      {"id":"c1", "name":"D.O.","age":33,"picture":"EXO/do.jpg"},
      {"id":"c2", "name":"Kai","age":32,"picture":"EXO/kai.jpg"},
      {"id":"c3", "name":"Sehun","age":32,"picture":"EXO/sehun.jpg"},
      {"id":"c4", "name":"Suho","age":35,"picture":"EXO/suho.jpg"},
      {"id":"c5", "name":"Chanyeol","age":34,"picture":"EXO/pcy.jpg"},
    ]
    constructor(){ }
    get_all_customer()
    {
      return this.customers
    }
    get_customer_detail(id:string)
    {
      let c=this.customers.find(x=>x.id==id)
      return c
    }
    filter_customers_by_age(a:number, b:number)
    {
      return this.customers.filter(c=>c.age>=a && c.age<=b);
    }
}
