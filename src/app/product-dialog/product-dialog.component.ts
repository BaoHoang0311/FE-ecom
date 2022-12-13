import { Component, OnInit } from '@angular/core';
import {FormControl,  FormGroup,FormBuilder , FormGroupDirective, NgForm, Validators,AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})

export class ProductDialogComponent implements OnInit {

  productForm !: FormGroup;
  constructor(private formBuilder :FormBuilder ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
        productName: ['', [Validators.required,Validators.minLength(3)]],
        amount: ['', [Validators.required,Validators.min(1), Validators.max(500)] ],
    });
  }
  // check validate input
  // productnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)] );
  // ammountFormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(500)] );
  matcher = new MyErrorStateMatcher();

  addProduct(){
   console.log(this.productForm.value);
  };
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
}


