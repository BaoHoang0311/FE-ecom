import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { BuyorderComponent } from './buyorder/buyorder.component';
import { OrderComponent } from './order/order.component';
import { ProductDialogComponent } from './product/product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductDiaglogDeleteComponent } from './product/product-diaglog-delete/product-diaglog-delete.component';
import { CustomerDiaglogDeleteComponent } from './customer/customer-diaglog-delete/customer-diaglog-delete.component';
import { CustomerDiaglogComponent } from './customer/customer-diaglog/customer-diaglog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { BuyorderDetailComponent } from './buyorder/buyorder-detail/buyorder-detail.component';
import { OrderDetailProductComponent } from './order/order-detail/order-detail-product/order-detail-product.component';
import { OrderDiaglogDeleteComponent } from './order/order-diaglog-delete/order-diaglog-delete.component';
import { BuyorderDiaglogDeleteComponent } from './buyorder/buyorder-diaglog-delete/buyorder-diaglog-delete.component';
import { BuyorderDetailProductComponent } from './buyorder/buyorder-detail/buyorder-detail-product/buyorder-detail-product.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomerComponent,
    BuyorderComponent,
    OrderComponent,
    ProductDialogComponent,
    ProductDiaglogDeleteComponent,
    CustomerDiaglogDeleteComponent,
    CustomerDiaglogComponent,
    OrderDetailComponent,
    BuyorderDetailComponent,
    OrderDetailProductComponent,
    OrderDiaglogDeleteComponent,
    BuyorderDiaglogDeleteComponent,
    BuyorderDetailProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
