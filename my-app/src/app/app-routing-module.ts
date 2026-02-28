import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { Notfound } from './notfound/notfound';
import { FakeProduct } from './fake-product/fake-product';
import { EX13 } from './ex13/ex13';
import { EX14 } from './ex14/ex14';
import { EX18 } from './ex18/ex18';
import { Ex19 } from './ex19/ex19';
import { EX10 } from './ex10/ex10';
import { ServiceProductImageEventDetail } from './service-product-image-event-detail/service-product-image-event-detail';
import { Product } from './product/product';
import { ListProduct } from './list-product/list-product';
import { ServiceProduct } from './service-product/service-product';
import { Form } from './form/form';
import { Reactiveform } from './reactiveform/reactiveform';
import { Books } from './books/books';
import { Ex27 } from './ex27/ex27';
import { Ex28 } from './ex28/ex28';
import { EX26 } from './ex26/ex26';
import { BookDetail } from './book-detail/book-detail';
import { NewBook } from './new-book/new-book';
import { FileUpload } from './file-upload/file-upload';
import { Ex50 } from './ex50/ex50';
import { Ex50New } from './ex50/ex50-new/ex50-new';
import { Ex50Edit } from './ex50/ex50-edit/ex50-edit';
import { Ex50Detail } from './ex50/ex50-detail/ex50-detail';
import { BookUpdate } from './book-update/book-update';
import { Fashion } from './fashion/fashion';


const routes: Routes = [
  {path:"gioi-thieu",component:About},
  {path:"khach-hang-1",component:Listcustomer},
  {path:"khach-hang-2",component:Listcustomer2},
  {path:"khach-hang-3",component:Listcustomer3},
  {path:"san-pham-1",component:Listproduct},
  {path:"san-pham-1/:id",component:Productdetail},
  {path:"ex10",component:EX10},
  {path:"ex13",component:EX13},
  {path:'ex13/:id', component:ServiceProductImageEventDetail}, 
  {path:"ex14",component:EX14},
  {path:"ex18",component:EX18},
  {
    path:"ex19",
    component:Ex19,
    children: [
      { path: 'product', component: Product },
      { path: 'list-product', component: ListProduct },
      { path: 'service-product', component: ServiceProduct }
    ]
  },
  {path:"ex26",component:EX26},
  // {path:"ex26",component:FakeProduct},
  {path:"ex27",component:Ex27},
  {path:"ex28",component:Ex28},
  {path:"form",component:Form},
  {path:"Reactiveform",component: Reactiveform},
  {path:"ex39",component: Books},
  {path:"ex41",component: BookDetail},
  {path:"ex41/:id",component: BookDetail},
  {path:"ex43",component: NewBook},
  {path:"ex45",component: BookUpdate},
  {path:"ex45/:id",component: BookUpdate},
  {path:"ex49",component: FileUpload},
  {path:"ex50",component: Ex50},
  {path:"ex50/new",component: Ex50New},
  {path:"ex50/edit/:id",component: Ex50Edit},
  {path:"ex50/detail/:id",component: Ex50Detail},
  {path:"ex53",component: Fashion},
  {path:"**",component:Notfound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent=[ 
Product, 
ListProduct, 
ServiceProduct, 
] 
