import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/product/api.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})

export class ProductDialogComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    amount: new FormControl(''),
  });

  submitted = false;
  actionBtn = "Add";
  headerForm = "Add Product";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private notifyService: NotificationService,
    private diaglog: MatDialogRef<ProductDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public editData: any,

  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(
      {
        id: 0,
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        amount: ['', [Validators.required, Validators.min(1), Validators.max(500),]],
      });

    if (this.editData) {
      this.actionBtn = "Update";
      this.headerForm = "Update Product"
      this.productForm = this.formBuilder.group(
        {
          id: this.editData.id,
          fullName: [this.editData.fullName, [Validators.required, Validators.minLength(3)]],
          amount: [this.editData.amount, [Validators.required, Validators.min(1), Validators.max(500),]],
        });

    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onSubmit(): void {
    if (!this.editData) {
      this.submitted = true;
      if (this.productForm.invalid) {
        return;
      }
      console.log(this.productForm.value);
      // add product
      this.api.postProduct(this.productForm.value)
        .subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.notifyService.showSuccess("Add Product success!", "Thong bao");
              this.productForm.reset();
              this.diaglog.close('saveProduct');
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
    else {
      this.updateProduct();
    }
  };

  updateProduct() {
    console.log(this.productForm.value);
    this.api.putProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notifyService.showSuccess("Update Product success!", "Thong bao");
            this.productForm.reset();
            this.diaglog.close('updateProduct');
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

  onReset(): void {
    this.submitted = false;
    this.productForm = this.formBuilder.group(
      {
        id: this.editData.id,
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        amount: ['', [Validators.required, Validators.min(1), Validators.max(500),]],
      });
  }
}


