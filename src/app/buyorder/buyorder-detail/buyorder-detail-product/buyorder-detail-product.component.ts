import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/services/model/product.model';
import { ApiService } from 'src/app/services/product/api.service';
import { BuyorderDetailComponent } from '../buyorder-detail.component';
import { BuyorderService } from 'src/app/services/buyorder/buyorder.service';

@Component({
  selector: 'app-buyorder-detail-product',
  templateUrl: './buyorder-detail-product.component.html',
})
export class BuyorderDetailProductComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private diaglog: MatDialogRef<BuyorderDetailProductComponent>,
    public apibuyOrder: BuyorderService,

    // dung chung AddBuyorder + EditBuyorder
    @Inject(MAT_DIALOG_DATA) public editBuyOrderProductDetailData: any,
  ) { }

  dataSource !: MatTableDataSource<any>;

  listProduct: any = [];
  product: any;

  submitted = false;

  actionBtn = "Add";
  headerForm = "Add";

  gtln: any;

  BuyOrderDetailProductForm: FormGroup = new FormGroup({
    productId: new FormControl(''),
    ammount: new FormControl(''),
    price: new FormControl(''),
    totalPrice: new FormControl(''),
    productName: new FormControl(''),
  });


  ngOnInit(): void {
    this.getAllProducts();

    if (this.editBuyOrderProductDetailData) {
      this.actionBtn = "Update";
      this.headerForm = "Update";

      this.BuyOrderDetailProductForm = this.formBuilder.group(
        {
          id: this.editBuyOrderProductDetailData.items.id,
          productId: [this.editBuyOrderProductDetailData.items.productId, [Validators.required]],
          productAmmount: [this.editBuyOrderProductDetailData.items.productAmmount, [Validators.required, Validators.min(1)]],
          price: [this.editBuyOrderProductDetailData.items.price, [Validators.required, Validators.min(1), Validators.max(500)]],
          totalPrice: [this.editBuyOrderProductDetailData.items.totalPrice],
        });
      this.BuyOrderDetailProductForm.controls['totalPrice'].setValue(this.editBuyOrderProductDetailData.items.totalPrice);
    }
    else {
      this.BuyOrderDetailProductForm = this.formBuilder.group(
        {
          id: 0,
          productId: ['', [Validators.required]],
          productAmmount: ['', [Validators.required, Validators.min(1)]],
          price: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
          totalPrice: ['', [Validators.required]],
        });
    }
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
  get f(): { [key: string]: AbstractControl } {
    return this.BuyOrderDetailProductForm.controls;
  }
  on_Submit_BuyOrderdetailProduct_in_AddBuyOrder() {
    this.submitted = true;
    // (dung chung 1 form) => data blank => Form AddItem 
    if (!this.editBuyOrderProductDetailData) {
      if (this.BuyOrderDetailProductForm.invalid) {
        return;
      }
      this.apibuyOrder.buyorderItems.push(this.BuyOrderDetailProductForm.value);
      this.diaglog.close('addOrderDetai');
    }
    // (dung chung 1 form) => have data => Form Edititem 
    else {
      if (this.editBuyOrderProductDetailData.invalid) {
        return;
      }
      // pass datafromDiaglog this.editOrderProductDetailData = { idx : index, items : item} (idx: index in list (0,1) )
      this.apibuyOrder.buyorderItems[this.editBuyOrderProductDetailData.idx] = this.BuyOrderDetailProductForm.value;
      console.log('this.apiOrder.orderItems[this.editOrderProductDetailData.idx]', this.apibuyOrder.buyorderItems[this.editBuyOrderProductDetailData.idx])
      console.log('this.OrderDetailProductForm.value', this.BuyOrderDetailProductForm.value)
      // name for productName vi tra ve ko co properties productName
      if (this.BuyOrderDetailProductForm.value.productName == null) {
        /*
          khi edit thi ko edit name thi se khong co ten phai set nhu vay
          con da eidt thi khong can
        */
        this.BuyOrderDetailProductForm.value.productName = this.editBuyOrderProductDetailData.items.productName;
      }
      // giữ lại  BuyOrderDetailId
      if (this.editBuyOrderProductDetailData.items.id != 0) {
        this.BuyOrderDetailProductForm.value.id = this.editBuyOrderProductDetailData.items.id;
        console.log('this.OrderDetailProductForm.value.id', this.BuyOrderDetailProductForm.value.id)
      }
      this.diaglog.close('editOrderDetai');
    }
  }
  onChange(newValue: any) {
    console.log('newValue', newValue);
    this.product = this.listProduct.find((item: any) => item.productId == newValue);
    console.log('this.product', this.product)
    this.gtln = this.product.productAmount;
    console.log('this.gtln', this.gtln);
    this.BuyOrderDetailProductForm = this.formBuilder.group(
      {
        id: 0,
        productId: [this.BuyOrderDetailProductForm.value.productId, [Validators.required]],
        productName: [this.product.productName],
        productAmmount: [this.BuyOrderDetailProductForm.value.productAmmount, [Validators.required, Validators.min(1), Validators.max(this.gtln)]],
        price: [this.BuyOrderDetailProductForm.value.price, [Validators.required, Validators.min(1), Validators.max(500)]],
        totalPrice: [this.BuyOrderDetailProductForm.value.totalPrice, [Validators.required, Validators.min(1), Validators.max(500)]],
      });
  }
  updateTotal() {
    let tongtien = parseFloat((this.BuyOrderDetailProductForm.value.price * this.BuyOrderDetailProductForm.value.productAmmount).toFixed(2));
    this.BuyOrderDetailProductForm.controls['totalPrice'].setValue(tongtien);
  }
}
