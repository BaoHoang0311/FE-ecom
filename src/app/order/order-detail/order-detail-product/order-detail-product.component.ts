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

    // dung chung Addorder + Editorder
    @Inject(MAT_DIALOG_DATA) public editOrderProductDetailData: any,

  ) { }

  dataSource !: MatTableDataSource<any>;

  listProduct: any = [];
  product: any;

  submitted = false;

  actionBtn = "Add";
  headerForm = "Add";

  gtln: any;

  OrderDetailProductForm: FormGroup = new FormGroup({
    productId: new FormControl(''),
    ammount: new FormControl(''),
    price: new FormControl(''),
    totalPrice: new FormControl(''),
    productName: new FormControl(''),
  });

  // disabledItem: number = 0;

  ngOnInit(): void {
    this.getAllProducts();

    if (this.editOrderProductDetailData) {
      this.actionBtn = "Update";
      this.headerForm = "Update";
      this.OrderDetailProductForm = this.formBuilder.group(
        {
          id: this.editOrderProductDetailData.items.id,
          productId: [this.editOrderProductDetailData.items.productId, [Validators.required]],
          productAmmount: [this.editOrderProductDetailData.items.productAmmount, [Validators.required, Validators.min(1)]],
          price: [this.editOrderProductDetailData.items.price, [Validators.required, Validators.min(1), Validators.max(500)]],
          totalPrice: [this.editOrderProductDetailData.items.totalPrice],
        });
      this.OrderDetailProductForm.controls['totalPrice'].setValue(this.editOrderProductDetailData.items.totalPrice);
    }
    else {
      this.OrderDetailProductForm = this.formBuilder.group(
        {
          id: 0,
          productId: ['', [Validators.required]],
          productAmmount: ['', [Validators.required, Validators.min(1)]],
          price: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
          totalPrice: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
        });
    }
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
    console.log('newValue', newValue);
    this.product = this.listProduct.find((item: any) => item.productId == newValue);
    console.log('this.product', this.product)
    this.gtln = this.product.productAmount;
    console.log('this.gtln', this.gtln);
    this.OrderDetailProductForm = this.formBuilder.group(
      {
        id: 0,
        productId: [this.OrderDetailProductForm.value.productId, [Validators.required]],
        productName: [this.product.productName],
        productAmmount: [this.OrderDetailProductForm.value.productAmmount, [Validators.required, Validators.min(1), Validators.max(this.gtln)]],
        price: [this.OrderDetailProductForm.value.price, [Validators.required, Validators.min(1), Validators.max(500)]],
        totalPrice: [this.OrderDetailProductForm.value.totalPrice, [Validators.required, Validators.min(1), Validators.max(500)]],
      });
  }

  // Add or Update buttton in order detail productform
  on_Submit_OrderdetailProduct_in_AddOrder() {

    this.submitted = true;
    // data blank => Form AddItem (dung chung 1 form)
    if (!this.editOrderProductDetailData) {
      if (this.OrderDetailProductForm.invalid) {
        return;
      }
      this.apiOrder.orderItems.push(this.OrderDetailProductForm.value);
      this.diaglog.close('addOrderDetai');
    }
    // have data => Form EditItem (dung chung 1 form)
    else {
      if (this.OrderDetailProductForm.invalid) {
        return;
      }
      this.editOrderProductDetailData
      console.log(`xuong day`);
      // pass datafromDiaglog { idx : index, items : item}
      this.apiOrder.orderItems[this.editOrderProductDetailData.idx] = this.OrderDetailProductForm.value;
      console.log('this.OrderDetailProductForm.value', this.OrderDetailProductForm.value)
      if (this.OrderDetailProductForm.value.productName == null) {
        this.OrderDetailProductForm.value.productName = "dasdasdadasd";
        console.log(`hoho`);
        console.log(this.OrderDetailProductForm.value.productName);
      }
      this.diaglog.close('editOrderDetai');
    }
  }

  // tính totalPrice từng product
  updateTotal() {
    let tongtien = parseFloat((this.OrderDetailProductForm.value.price * this.OrderDetailProductForm.value.productAmmount).toFixed(2));
    this.OrderDetailProductForm.controls['totalPrice'].setValue(tongtien);
  }

}
