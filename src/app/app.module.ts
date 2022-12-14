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
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductDiaglogDeleteComponent } from './product-diaglog-delete/product-diaglog-delete.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomerComponent,
    BuyorderComponent,
    OrderComponent,
    ProductDialogComponent,
    ProductDiaglogDeleteComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
