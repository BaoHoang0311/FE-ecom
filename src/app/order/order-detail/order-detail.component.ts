import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';
import { Customer } from 'src/app/services/model/customer.model';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderDetailProductComponent } from './order-detail-product/order-detail-product.component';
import { OrderItem } from 'src/app/services/model/order-item.model';
import { NotificationService } from 'src/app/notification/notification.service';
import { Router } from "@angular/router"
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private apiCus: CustomerServiceService,
    public apiOrder: OrderService,
    private diaglog: MatDialog,
    private notifyService: NotificationService,
    private router: Router
  ) { }

  listCustomer: any = [];

  submitted = false;

  selectedOccupations: any = [];

  OrderForm: FormGroup = new FormGroup({
    orderId: new FormControl(''),
    orderNo: new FormControl(''),
    customerId: new FormControl(''),
    totalPrice: new FormControl(''),

  });

  orderDetailDtos: any = OrderItem;

  ngOnInit(): void {

    this.getAllCustomers();
    // this.apiOrder.orderItems;
    this.OrderForm = this.formBuilder.group(
      {
        orderNo: ['', [Validators.required, Validators.minLength(3)]],
        customerId: ['', Validators.required],
        totalPrice: ['', Validators.required],
      });
  };

  // dropdown danh sách khách hàng
  getAllCustomers() {
    this.apiCus.getAllCustomer().subscribe(
      {
        next: (res) => {
          this.listCustomer = res.data.map((elem: Customer) => {
            return {
              customerId: elem.id,
              fullName: elem.fullName
            }
          });
        },
        error: (err) => { console.log(err); }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.OrderForm.invalid) {
      console.log('bisai', this.OrderForm);
      return;
    }

    var body = {
      orderId: 0,
      orderNo: this.OrderForm.value.orderNo,
      customerId: parseInt(this.OrderForm.value.customerId),
      totalPrice: this.OrderForm.value.totalPrice,
      orderDetailDtos: this.apiOrder.orderItems,
    };
    console.log(`body`, body);

    this.apiOrder.postOrder(body)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusCode === 200) {
            this.notifyService.showSuccess("Add Customer success!", "Thong bao");
            this.OrderForm.reset();
            this.apiOrder.orderItems.length = 0;
            this.router.navigate(['/Order'])
          }
          else {
            this.notifyService.showError("Something is wrong", "Thong bao")
          }
        },
        error: () => {
          this.notifyService.showError("Something is wrong", "Thong bao")
        }
      })
    // console.log('ok ', this.OrderForm.value);
  }





  get f(): { [key: string]: AbstractControl } {
    return this.OrderForm.controls;
  }


  openDialogProductDetail() {

    this.diaglog.open(OrderDetailProductComponent,
      {
        width: '30%',
        height: '60%',
        data: { zzz: this.selectedOccupations }
      }
    ).afterClosed().subscribe(val => {
      console.log('a', this.apiOrder.orderItems);

      // console.log(this.apiOrder.orderItems);

      this.selectedOccupations.push(this.apiOrder.orderItems[this.apiOrder.orderItems.length - 1].productId);
      console.log(this.selectedOccupations);
      this.updateGrandTotal();
    });
  }

  updateGrandTotal() {
    let Sum_orderDetail = this.apiOrder.orderItems.reduce((prev: any, curr: any) => {
      return prev + curr.totalPrice;
    }, 0);
    let gt = parseFloat(Sum_orderDetail);
    this.OrderForm.controls['totalPrice'].setValue(gt);
    console.log(Sum_orderDetail);
  }

}
