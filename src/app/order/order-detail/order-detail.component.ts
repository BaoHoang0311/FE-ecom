import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';
import { Customer } from 'src/app/services/model/customer.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(

    private apiCus: CustomerServiceService,
  ) { }

  customer !: Customer;
  listCustomer: any = [];

  ngOnInit(): void {

    this.loadCustomersInOrder();

    // console.log("dsadasd", this.listCustomer);

  };
  loadCustomersInOrder() {
    // this.apiCus.getAllCustomer().subscribe(res => {
    //   this.listCustomer = res.data;
    // })

    this.apiCus.getAllCustomer().subscribe(res => {
      this.listCustomer = res.data.map((elem: Customer) => {
        return {
          id: elem.id,
          fullName: elem.fullName
        }
      });
      console.log(this.listCustomer);
    })
  };
}


