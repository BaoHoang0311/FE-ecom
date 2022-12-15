import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification/notification.service';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';

@Component({
  selector: 'app-customer-diaglog',
  templateUrl: './customer-diaglog.component.html',
  styleUrls: ['./customer-diaglog.component.css']
})
export class CustomerDiaglogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private cusapi: CustomerServiceService,
    private notifyService: NotificationService,
    private diaglog: MatDialogRef<CustomerDiaglogComponent>,

    @Inject(MAT_DIALOG_DATA) public editCustomerData: any,

  ) { }
  customerForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  submitted = false;
  actionBtn = "Add";
  headerForm = "Add Customer";

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group(
      {
        id: 0,
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
        address: ['', Validators.required]
      });

  }


  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.customerForm.reset();
  }

  onSubmit(): void {
    if (!this.editCustomerData) {
      this.submitted = true;
      if (this.customerForm.invalid) {
        return;
      }
      console.log(this.customerForm.value);
      // add customer
      this.cusapi.postCustomer(this.customerForm.value)
        .subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.notifyService.showSuccess("Add Customer success!", "Thong bao");
              this.customerForm.reset();
              this.diaglog.close('saveCustomer');
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

    }
  };


}
