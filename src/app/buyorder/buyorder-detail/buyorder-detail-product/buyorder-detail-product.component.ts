import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/services/model/product.model';
import { ApiService } from 'src/app/services/product/api.service';
import { BuyorderDetailComponent } from '../buyorder-detail.component';
import { BuyorderService } from 'src/app/services/buyorder/buyorder.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
    public cdRef: ChangeDetectorRef,
    // dung chung AddBuyorder + EditBuyorder
    @Inject(MAT_DIALOG_DATA) public editBuyOrderProductDetailData: any,
  ) { }

  listProduct: any = [];
  product: any;
  gtln: any;

  submitted = false;

  actionBtn = "Add";
  headerForm = "Add";

  BuyOrderDetailProductForm: FormGroup = new FormGroup({
    productId: new FormControl(''),
    productAmmount: new FormControl(''),
    price: new FormControl(''),
    totalPrice: new FormControl(''),
    productName: new FormControl(''),
  });


  ngOnInit(): void {

    this.getAllProducts();


    if (this.editBuyOrderProductDetailData) {
      
      this.actionBtn = "Update";
      this.headerForm = "Update";
      this.product = this.editBuyOrderProductDetailData.max;

      this.BuyOrderDetailProductForm = this.formBuilder.group(
        {
          id: this.editBuyOrderProductDetailData.items.id,
          productId: [this.editBuyOrderProductDetailData.items.productId, [Validators.required]],
          productAmmount: [this.editBuyOrderProductDetailData.items.productAmmount, [Validators.required, Validators.min(1), Validators.max(this.editBuyOrderProductDetailData.max.productAmount)]],
          productName: [this.editBuyOrderProductDetailData.items.productName, [Validators.required, Validators.min(1)]],
          price: [this.editBuyOrderProductDetailData.items.price, [Validators.required, Validators.min(1), Validators.max(500)]],
          totalPrice: [this.editBuyOrderProductDetailData.items.totalPrice, [Validators.required]],
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
      console.log('this.apibuyOrder.buyorderItems', this.apibuyOrder.buyorderItems)

      this.diaglog.close('addOrderDetai');
    }
    // (dung chung 1 form) => have data => Form Edititem 
    else {
      if (this.BuyOrderDetailProductForm.invalid) {
        return;
      }
      // pass datafromDiaglog this.editOrderProductDetailData = { idx : index, items : item} (idx: index in list (0,1) )
      this.apibuyOrder.buyorderItems[this.editBuyOrderProductDetailData.idx] = this.BuyOrderDetailProductForm.value;
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
        // buyOrderId
        this.BuyOrderDetailProductForm.value.id = this.editBuyOrderProductDetailData.items.id;

        console.log('this.BuyOrderDetailProductForm.value.id', this.BuyOrderDetailProductForm.value.id);
      }
      this.diaglog.close('editOrderDetai');
    }
  }
  onChange(newValue: any) {
    this.product = this.listProduct.find((item: any) => item.productId == newValue);
    this.BuyOrderDetailProductForm = this.formBuilder.group(
      {
        id: 0,
        productId: [this.BuyOrderDetailProductForm.value.productId, [Validators.required]],
        productName: [this.product.productName],
        productAmmount: [this.BuyOrderDetailProductForm.value.productAmmount, [Validators.required, Validators.min(1), Validators.max(this.product.productAmount)]],
        price: [this.BuyOrderDetailProductForm.value.price, [Validators.required, Validators.min(1), Validators.max(500)]],
        totalPrice: [this.BuyOrderDetailProductForm.value.totalPrice, [Validators.required, Validators.min(1), Validators.max(500)]],
      });
    console.log('this.BuyOrderDetailProductForm.value.productAmount', this.BuyOrderDetailProductForm.value.productAmount)

  }
  updateTotal() {
    let tongtien = parseFloat((this.BuyOrderDetailProductForm.value.price * this.BuyOrderDetailProductForm.value.productAmmount).toFixed(2));
    this.BuyOrderDetailProductForm.controls['totalPrice'].setValue(tongtien);
  }
}
