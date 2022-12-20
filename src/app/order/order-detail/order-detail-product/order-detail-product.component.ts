import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { OrderItem } from 'src/app/services/model/order-item.model';
import { Product } from 'src/app/services/model/product.model';
import { ApiService } from 'src/app/services/product/api.service';
import { OrderDetailComponent } from '../order-detail.component';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-detail-product',
  templateUrl: './order-detail-product.component.html',
  styleUrls: ['./order-detail-product.component.css']
})
export class OrderDetailProductComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private diaglog: MatDialogRef<OrderDetailProductComponent>,
    private apiOrder: OrderService,

    @Inject(MAT_DIALOG_DATA) public editOrderProductDetailData: any,

  ) { }

  dataSource !: MatTableDataSource<any>;

  listProduct: any = [];
  product: any;

  submitted = false;

  actionBtn = "Add";
  headerForm = "Add";

  OrderDetailProductForm: FormGroup = new FormGroup({
    productId: new FormControl(''),
    ammount: new FormControl(''),
    price: new FormControl(''),
    totalPrice: new FormControl(''),
  });

  // disabledItem: number = 0;

  ngOnInit(): void {
    this.getAllProducts();

    this.OrderDetailProductForm = this.formBuilder.group(
      {
        id: 0,
        productId: ['', [Validators.required]],
        ammount: ['', [Validators.required, Validators.min(1)]],
        price: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
        totalPrice: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      });


    if (this.editOrderProductDetailData) {
      this.actionBtn = "Update";
      this.headerForm = "Update Order"
      this.OrderDetailProductForm = this.formBuilder.group(
        {
          id: this.editOrderProductDetailData.items.id,
          productId: [this.editOrderProductDetailData.items.productId, [Validators.required, Validators.minLength(3)]],
          ammount: [this.editOrderProductDetailData.items.ammount, [Validators.required, Validators.email]],
          price: [this.editOrderProductDetailData.items.price, [Validators.required, Validators.min(1), Validators.max(500)]],
          totalPrice: [this.editOrderProductDetailData.items.totalPrice],
        });
      this.OrderDetailProductForm.controls['totalPrice'].setValue(this.editOrderProductDetailData.items.totalPrice);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`dsdsdsdsdsd`, changes);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.OrderDetailProductForm.controls;
  }

  getAllProducts() {
    this.api.getProduct().subscribe(
      {
        next: (res) => {
          this.dataSource = new MatTableDataSource(res.data);
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

  // lấy product ID

  onChange(newValue: any) {
    this.product = this.listProduct.find((item: any) => item.productId == newValue);
    let gtln = this.product.productAmount;
    this.OrderDetailProductForm = this.formBuilder.group(
      {
        id: 0,
        productId: [this.OrderDetailProductForm.value.productId, [Validators.required]],
        productName: [this.product.productName],
        ammount: [this.OrderDetailProductForm.value.ammount, [Validators.required, Validators.min(1), Validators.max(gtln)]],
        price: [this.OrderDetailProductForm.value.price, [Validators.required, Validators.min(1), Validators.max(500)]],
        totalPrice: [this.OrderDetailProductForm.value.totalPrice, [Validators.required, Validators.min(1), Validators.max(500)]],
      });
  }

  onSubmitOrderdetailProductinAddOrder() {

    if (!this.editOrderProductDetailData) {
      this.submitted = true;
      if (this.OrderDetailProductForm.invalid) {
        console.log('ssasas', this.OrderDetailProductForm);
        console.log(this.OrderDetailProductForm.value);
        return;
      }
      this.apiOrder.orderItems.push(this.OrderDetailProductForm.value);
      this.diaglog.close('addOrderDetai');
    }
    else {
      console.log(`edit here`, this.OrderDetailProductForm.value);
      console.log(`777777`, this.editOrderProductDetailData)

      this.apiOrder.orderItems[this.editOrderProductDetailData.i] = this.OrderDetailProductForm.value;
      console.log(`888888`, this.apiOrder.orderItems);
      this.diaglog.close('editOrderDetai');
    }
  }

  // tính totalPrice từng product
  updateTotal() {
    let tongtien = parseFloat((this.OrderDetailProductForm.value.price * this.OrderDetailProductForm.value.ammount).toFixed(2));
    this.OrderDetailProductForm.controls['totalPrice'].setValue(tongtien);
  }

}
