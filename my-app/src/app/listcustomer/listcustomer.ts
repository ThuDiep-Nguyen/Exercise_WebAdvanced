import { Component } from '@angular/core';

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers=[
      {"id":"c1", "name":"D.O.","age":33,"picture":"EXO/do.jpg"},
      {"id":"c2", "name":"Kai","age":32,"picture":"EXO/kai.jpg"},
      {"id":"c3", "name":"Sehun","age":32,"picture":"EXO/sehun.jpg"},
      {"id":"c4", "name":"Suho","age":35,"picture":"EXO/suho.jpg"},
      {"id":"c5", "name":"Chanyeol","age":34,"picture":"EXO/pcy.jpg"},
    ]

}