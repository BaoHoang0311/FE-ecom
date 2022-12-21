import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';
import { Customer } from 'src/app/services/model/customer.model';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderDetailProductComponent } from './order-detail-product/order-detail-product.component';
import { OrderItem } from 'src/app/services/model/order-item.model';
import { NotificationService } from 'src/app/notification/notification.service';
import { ActivatedRoute, Router } from "@angular/router"
import { OrderDetailService } from 'src/app/services/order-detail/order-detail.service';
import { ApiService } from 'src/app/services/product/api.service';
import { Product } from 'src/app/services/model/product.model';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private apiCus: CustomerServiceService,
    public apiOrder: OrderService,
    private diaglog: MatDialog,
    private notifyService: NotificationService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private orderDetailApi: OrderDetailService,
    private api: ApiService,
  ) { }

  listCustomer: any = [];

  listProduct: any = [];
  product: any;
  gtln: any;

  submitted = false;
  headerOrderDetail = "Add";

  // selectedOccupations: any = [];

  OrderForm: FormGroup = new FormGroup({
    orderId: new FormControl(''),
    orderNo: new FormControl(''),
    customerId: new FormControl(''),
    totalPrice: new FormControl(''),
  });

  orderDetailDtos: any = OrderItem;
  orderIdinUrl: any = "";

  ngOnInit(): void {

    this.getAllCustomers();
    this.getAllProducts();
    
    this.OrderForm = this.formBuilder.group(
      {
        orderNo: ['', [Validators.required, Validators.minLength(3)]],
        customerId: ['', Validators.required],
        totalPrice: ['', Validators.required],
      });

    this.orderIdinUrl = this.currentRoute.snapshot.paramMap.get('id');
    // console.log(`orderId`, orderID);
    if (this.orderIdinUrl != null) {
      this.headerOrderDetail = "Update";
      this.getOrderByID(parseInt(this.orderIdinUrl));
    }
    else {
      this.apiOrder.orderItems = [];
    }
  };

  getOrderByID(id: any) {
    this.apiOrder.getOrderbyId(parseInt(this.orderIdinUrl)).subscribe(
      {
        next: (res) => {
          this.OrderForm = this.formBuilder.group(
            {
              orderId: res.data[0].id,
              orderNo: res.data[0].orderNo,
              customerId: res.data[0].customerId,
              totalPrice: 0,
            });

          // mapdata form API to listOrderDetails
          this.apiOrder.orderItems = this.ApitoOderDetail(res.data[0].orderDetails);

          this.updateGrandTotal();

        },
        error: (err) => { console.log(err); }
      });
  }

  // mapdata form API to listOrderDetails
  // get(OrderDetail(ammount)) toTable -> productAmmount 
  ApitoOderDetail(oderDetailsList: any) {
    let b = [];
    for (let i = 0; i < oderDetailsList.length; i++) {
      b.push({
        id: oderDetailsList[i].id,
        productId: oderDetailsList[i].productId,
        productName: oderDetailsList[i].product.fullName,
        productAmmount: oderDetailsList[i].ammount,
        price: oderDetailsList[i].price,
        totalPrice: oderDetailsList[i].totalPrice,
      });
    }
    return b;
  }

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
    // PutApi
    if (this.orderIdinUrl != null) {

      console.log('this.OrderForm.value', this.OrderForm.value);
      console.log('this.apiOrder.orderItems', this.apiOrder.orderItems);

      var bodyPut = {
        orderId: this.OrderForm.value.orderId,
        orderNo: this.OrderForm.value.orderNo,
        customerId: parseInt(this.OrderForm.value.customerId),
        totalPrice: this.OrderForm.value.totalPrice,
        orderDetailDtos: this.apiOrder.orderItems,
      };

      this.apiOrder.putOrder(bodyPut)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.statusCode === 200) {
              this.notifyService.showSuccess("Update Order success!", "Thong bao");
              this.OrderForm.reset();
              this.apiOrder.orderItems.length = [];
              this.router.navigate(['/Order'])
            }
            else {
              this.notifyService.showError("Update is wrong", "Thong bao")
            }
          },
          error: () => {
            this.notifyService.showError("Update is wrong", "Thong bao")
          }
        })
    }
    // PostApi
    else {
      var body = {
        orderId: 0,
        orderNo: this.OrderForm.value.orderNo,
        customerId: parseInt(this.OrderForm.value.customerId),
        totalPrice: this.OrderForm.value.totalPrice,
        orderDetailDtos: this.apiOrder.orderItems,
      };

      console.log(`body`, body);
      console.log('this.apiOrder.orderItems', this.apiOrder.orderItems);

      this.apiOrder.postOrder(body)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.statusCode === 200) {
              this.notifyService.showSuccess("Add Order success!", "Thong bao");
              this.OrderForm.reset();
              this.apiOrder.orderItems.length = [];
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
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.OrderForm.controls;
  }

  openDialogAddProductDetail() {

    this.diaglog.open(OrderDetailProductComponent,
      {
        width: '30%',
        height: '60%',
      }
    ).afterClosed().subscribe(val => {
      this.updateGrandTotal();
    });
  }

  updateGrandTotal() {
    let sumTotalPriceOrderDetail = this.apiOrder.orderItems.reduce((prev: any, curr: any) => {
      return prev + curr.totalPrice;
    }, 0);
    let gT = parseFloat(sumTotalPriceOrderDetail);

    //set GrandTotal
    this.OrderForm.controls['totalPrice'].setValue(gT);
  }

  onDeleteOrderDetail(index: any, item: any) {

    if (this.orderIdinUrl != null) {

      this.orderDetailApi.delOrderDetail(item.id).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notifyService.showSuccess("Delete OrderDetail success!", "Thong bao");
            this.getOrderByID(parseInt(this.orderIdinUrl));
            this.apiOrder.orderItems.splice(index, 1);
            console.log(`tinh tien `, this.apiOrder.orderItems);
          }
          else {
            this.notifyService.showError("Something is wrong", "Thong bao");
          }
        },
        error: () => {
          this.notifyService.showError("Something is wrong", "Thong bao");
        }
      });
    }
    else {
      console.log(`indexadd`, index);
      this.apiOrder.orderItems.splice(index, 1);
    }
    this.updateGrandTotal();
  }

  getAllProducts() {
    this.api.getProduct().subscribe(
      {
        next: (res) => {

          this.listProduct = res.data.map((elem: Product) => {
            return {
              productId: elem.id,
              productName: elem.fullName,
              productAmount: elem.amount,
            }
          });
        },
        error: (err) => { console.log(err); }
      });
  }
  onEditOrderDetail(index: any, item: any) {
    console.log('item', item);
    console.log('index', index);

    this.product = this.listProduct.find((item: any) => item.productId == item.productId);
    console.log('this.product', this.product);

    this.diaglog.open(OrderDetailProductComponent,
      {
        width: '30%',
        height: '60%',
        data: { idx: index, items: item, max: this.product }
      }
    ).afterClosed().subscribe(val => {
      this.updateGrandTotal();
    });
  }
}
