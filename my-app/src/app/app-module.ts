import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponent } from './app-routing-module';
import { App } from './app';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Customerdetail } from './customerdetail/customerdetail';
import { Learnbinding } from './learnbinding/learnbinding';
import { Ptb1 } from './ptb1/ptb1';
import { Ptb2 } from './ptb2/ptb2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Learndirective } from './learndirective/learndirective';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { Notfound } from './notfound/notfound';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { FakeProduct } from './fake-product/fake-product';
import { HttpClientModule } from '@angular/common/http';
import { EX18 } from './ex18/ex18';
import { EX13 } from './ex13/ex13';
import { EX14 } from './ex14/ex14';
import { EX10 } from './ex10/ex10';
import { EX26 } from './ex26/ex26';
import { Ex27 } from './ex27/ex27';
import { Ex19 } from './ex19/ex19';
import { ServiceProductImageEventDetail } from './service-product-image-event-detail/service-product-image-event-detail';
import { Product } from './product/product';
import { ListProduct } from './list-product/list-product';
import { ServiceProduct } from './service-product/service-product';
import { Ex28 } from './ex28/ex28';
import { Form } from './form/form';
import { Reactiveform } from './reactiveform/reactiveform';
import { Books } from './books/books';

@NgModule({
  declarations: [
    App,
    About,
    Contact,
    Customerdetail,
    Learnbinding,
    Ptb1,
    Ptb2,
    Learndirective,
    Listcustomer,
    Listcustomer2,
    Listcustomer3,
    Notfound,
    Listproduct,
    Productdetail,
    FakeProduct,
    EX13,
    EX14,
    EX18,
    EX10,
    EX26,
    Ex27,
    Ex19,
    ServiceProductImageEventDetail,
    Product,
    ListProduct,
    ServiceProduct,
    RoutingComponent,
    Ex28,
    Form,
    Reactiveform,
    Books,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
