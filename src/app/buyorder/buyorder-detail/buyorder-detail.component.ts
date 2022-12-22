import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { BuyorderService } from 'src/app/services/buyorder/buyorder.service';
import { BuyorderdetailService } from 'src/app/services/buyorderdetail/buyorderdetail.service';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';
import { Customer } from 'src/app/services/model/customer.model';
import { BuyorderDetailProductComponent } from './buyorder-detail-product/buyorder-detail-product.component';
import { ApiService } from 'src/app/services/product/api.service';
import { Product } from 'src/app/services/model/product.model';

@Component({
  selector: 'app-buyorder-detail',
  templateUrl: './buyorder-detail.component.html',
})
export class BuyorderDetailComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private apiCus: CustomerServiceService,
    public apibuyOrder: BuyorderService,
    private buyorderDetailApi: BuyorderdetailService,
    private diaglog: MatDialog,
    private notifyService: NotificationService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,

  ) { }

  listCustomer: any = [];

  submitted = false;
  headerOrderDetail = "Add";

  buyorderIdinUrl: any = "";

  listProduct: any = [];
  product: any;
  gtln: any;


  BuyOrderForm: FormGroup = new FormGroup({
    buyOrderId: new FormControl(''),
    orderNo: new FormControl(''),
    customerId: new FormControl(''),
    totalPrice: new FormControl(''),

  });

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCustomers();

    this.BuyOrderForm = this.formBuilder.group(
      {
        orderNo: ['', [Validators.required, Validators.minLength(3)]],
        customerId: ['', Validators.required],
        totalPrice: ['', [Validators.required, Validators.min(1)]],
      });

    this.buyorderIdinUrl = this.currentRoute.snapshot.paramMap.get('id');
    if (this.buyorderIdinUrl != null) {
      this.headerOrderDetail = "Update";
      this.getBuyOrderByID(parseInt(this.buyorderIdinUrl));
    }
    else {
      this.apibuyOrder.buyorderItems = [];
    }
  }
  onSubmit() {
    this.submitted = true;

    if (this.BuyOrderForm.invalid) {
      console.log('bisai', this.BuyOrderForm);
      return;
    }
    // PutApi
    if (this.buyorderIdinUrl != null) {

      console.log('this.BuyOrderForm.value', this.BuyOrderForm.value);
      console.log('this.apibuyOrder.orderItems', this.apibuyOrder.buyorderItems);

      var bodyPut = {
        buyOrderId: this.BuyOrderForm.value.buyOrderId,
        orderNo: this.BuyOrderForm.value.orderNo,
        customerId: parseInt(this.BuyOrderForm.value.customerId),
        totalPrice: this.BuyOrderForm.value.totalPrice,
        buyorderDetailDtos: this.apibuyOrder.buyorderItems,
      };

      this.apibuyOrder.putBuyOrder(bodyPut)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.statusCode === 200) {
              this.notifyService.showSuccess("Update BuyOrder success!", "Thong bao");
              this.BuyOrderForm.reset();
              this.apibuyOrder.buyorderItems.length = [];
              this.router.navigate(['/BuyOrder'])
            }
            else {
              this.notifyService.showError(`${res.message}`, "Thong bao")
            }
          },
          error: () => {
            this.notifyService.showError("Update is wrong zzz", "Thong bao")
          }
        })
    }
    // PostApi
    else {
      var body = {
        buyOrderId: 0,
        orderNo: this.BuyOrderForm.value.orderNo,
        customerId: parseInt(this.BuyOrderForm.value.customerId),
        totalPrice: this.BuyOrderForm.value.totalPrice,
        buyorderDetailDtos: this.apibuyOrder.buyorderItems,
      };

      console.log(`body`, body);
      console.log('this.apiOrder.orderItems', this.apibuyOrder.buyorderItems);

      this.apibuyOrder.postBuyOrder(body)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.statusCode === 200) {
              this.notifyService.showSuccess("Add Order success!", "Thong bao");
              this.BuyOrderForm.reset();
              this.apibuyOrder.buyorderItems.length = [];
              this.router.navigate(['/BuyOrder'])
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

  get employees(): FormArray {
    return this.BuyOrderForm.get('buyorderDetailDtos') as FormArray;
  }

  // dropdown danh sách khách hàng
  getAllCustomers() {
    this.apiCus.getAllCustomerPaging('', 1, 113).subscribe(
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


  getBuyOrderByID(id: any) {
    this.apibuyOrder.getBuyOrdersbyId(id).subscribe(
      {
        next: (res) => {
          this.BuyOrderForm = this.formBuilder.group(
            {
              buyOrderId: res.data[0].id,
              orderNo: res.data[0].orderNo,
              customerId: res.data[0].customerId,
              totalPrice: 0,
            });

          // mapdata form API to listOrderDetails
          this.apibuyOrder.buyorderItems = this.ApitoBuyOderDetail(res.data[0].buyOrderDetails);

          // this.OrderForm.value.totalPrice = res.data[0].totalPrice;
          this.updateGrandTotal();
        },
        error: (err) => { console.log(err); }
      });
  }

  ApitoBuyOderDetail(buyoderDetailsList: any) {
    let b = [];
    for (let i = 0; i < buyoderDetailsList.length; i++) {
      b.push({
        id: buyoderDetailsList[i].id,
        productId: buyoderDetailsList[i].productId,
        productName: buyoderDetailsList[i].product.fullName,
        productAmmount: buyoderDetailsList[i].ammount,
        price: buyoderDetailsList[i].price,
        totalPrice: buyoderDetailsList[i].totalPrice,
      });
    }
    return b;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.BuyOrderForm.controls;
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

  onEditBuyOrderDetail(index: any, item: any) {

    console.log('item', item)
    console.log('index', index)

    this.product = this.listProduct.find((item: any) => item.productId == item.productId);
    console.log('this.product', this.product)


    this.diaglog.open(BuyorderDetailProductComponent,
      {
        width: '30%',
        height: '60%',
        data: { idx: index, items: item, max: this.product }
      }
    ).afterClosed().subscribe(val => {
      this.updateGrandTotal();
    })
  }

  onDeleteBuyOrderDetail(index: any, item: any) {

    if (this.buyorderIdinUrl != null) {
      this.buyorderDetailApi.delBuyOrderDetail(item.id).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notifyService.showSuccess("Delete OrderDetail success!", "Thong bao");
            this.getBuyOrderByID(parseInt(this.buyorderIdinUrl));

            this.apibuyOrder.buyorderItems.splice(index, 1);
            console.log(`this.apibuyOrder.buyorderItems`, this.apibuyOrder.buyorderItems);
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
      this.apibuyOrder.buyorderItems.splice(index, 1);
    }
    this.updateGrandTotal();
  }
  openDialogAddProductDetail() {
    this.diaglog.open(BuyorderDetailProductComponent,
      {
        width: '30%',
        height: '60%',
      }
    ).afterClosed().subscribe(val => {
      this.updateGrandTotal();
    });
  }
  updateGrandTotal() {
    let sumTotalPriceOrderDetail = this.apibuyOrder.buyorderItems.reduce((prev: any, curr: any) => {
      return prev + curr.totalPrice;
    }, 0);
    let gT = parseFloat(sumTotalPriceOrderDetail);

    //set GrandTotal
    this.BuyOrderForm.controls['totalPrice'].setValue(gT);
  }
}
