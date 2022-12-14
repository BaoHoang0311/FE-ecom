import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})

export class ProductDialogComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    productName: new FormControl(''),
    ammount: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(
      {
        productName: ['', [Validators.required, Validators.minLength(3)]],
        ammount : [
          '',
          [
            Validators.required,
            Validators.min(1),
            Validators.max(500),
          ],
        ],

      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    console.log(this.productForm.value);
  }

  onReset(): void {
    this.submitted = false;
    this.productForm.reset();
  }
}


