import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { BuyorderComponent } from './buyorder/buyorder.component';
import { OrderComponent } from './order/order.component';
import { BuyorderDetailComponent } from './buyorder/buyorder-detail/buyorder-detail.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';

const routes: Routes = [
  { path: 'Customer', component: CustomerComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'BuyOrder', component: BuyorderComponent },


  { path: 'Order', component: OrderComponent },
  {
    path: 'Order', children: [
      { path: 'add', component: OrderDetailComponent },
      // { path: 'edit/:id', component: OrderDetailComponent }
    ]
  },

  { path: 'BuyOrderDetail', component: BuyorderDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
