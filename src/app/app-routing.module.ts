import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { BuyorderComponent } from './buyorder/buyorder.component';
import { OrderComponent } from './order/order.component';
const routes: Routes = [
  { path: 'Customer', component: CustomerComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'BuyOrder', component: BuyorderComponent },
  { path: 'Order', component: OrderComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
