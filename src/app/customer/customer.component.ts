import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerServiceService } from '../services/customer/customer-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDiaglogComponent } from './customer-diaglog/customer-diaglog.component';
import { CustomerDiaglogDeleteComponent } from './customer-diaglog-delete/customer-diaglog-delete.component';

@Component({
   selector: 'app-customer',
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

   constructor(
      private diaglog: MatDialog,
      private apiCus: CustomerServiceService,
   ) { }

   displayedColumns: string[] = ['id', 'fullName', 'email', 'phone', 'Action'];
   dataSource !: MatTableDataSource<any>;

   Customers: any;
   allCustomers: number = 0;
   pagination: number = 1;
   sortBy: string = "";

   ngOnInit(): void {
      this.GetCustomers();
   }

   openDialogAddCustomer() {
      this.diaglog.open(CustomerDiaglogComponent, { width: '30%', height: '60%', })
         .afterClosed().subscribe(val => {
            if (val == 'saveCustomer') {
               this.GetCustomers();
            }
         });
   };

   editDiaglogEditCustomer(Customer: any) {
      console.log(Customer);
      this.diaglog.open(CustomerDiaglogComponent, { width: '30%', height: '60%', data: Customer })
         .afterClosed().subscribe(val => {
            if (val == 'updateCustomer') {
               this.GetCustomers();
            }
         });
   };

   GetCustomers() {
      this.apiCus.getAllCustomerPaging(this.sortBy, this.pagination, 3).subscribe((res: any) => {
         console.log("id chua click:  " + this.sortBy)
         this.Customers = res.data;
         this.allCustomers = res.total;
      });
   }
   renderPage(event: number) {
      this.pagination = event;
      console.log(event);
      this.GetCustomers();
   }

   openDialogDelProduct(student: any) {
      console.log(student);
      this.diaglog.open(CustomerDiaglogDeleteComponent, { width: '30%', height: '60%', data: student })
         .afterClosed().subscribe(val => {
            if (val == 'DelCustomer') {
               this.GetCustomers();
            }
         });
   };

   sortData() {
      if (this.sortBy === "") {
         this.sortBy = "Id";
         console.log("id da click:  " + this.sortBy)
         this.apiCus.getAllCustomerPaging(this.sortBy, this.pagination, 3).subscribe((res: any) => {
            console.log("id da click:  " + this.sortBy)
            this.Customers = res.data;
            this.allCustomers = res.total;
            console.log(res.data);
         });
      }
      else {
         this.sortBy = "";
         console.log("id da click:  " + this.sortBy)
         this.apiCus.getAllCustomerPaging(this.sortBy, this.pagination, 3).subscribe((res: any) => {
            console.log("id da click:  " + this.sortBy)
            this.Customers = res.data;
            this.allCustomers = res.total;
            console.log(res.data);
         });
      }
   }

}
