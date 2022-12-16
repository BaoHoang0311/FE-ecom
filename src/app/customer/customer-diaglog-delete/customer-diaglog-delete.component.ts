import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification/notification.service';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';

@Component({
  selector: 'app-customer-diaglog-delete',
  templateUrl: './customer-diaglog-delete.component.html',
  styleUrls: ['./customer-diaglog-delete.component.css']
})
export class CustomerDiaglogDeleteComponent implements OnInit {

  constructor(
    private cusapi: CustomerServiceService,
    private diaglog: MatDialogRef<CustomerDiaglogDeleteComponent>,
    private notifyService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public DeleteData: any,
  ) { }
  name: string = "";

  ngOnInit(): void {
    this.name = this.DeleteData.fullName;
  }
  deleteCustomer() {
    this.cusapi.delCustomer(this.DeleteData.id)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notifyService.showSuccess("Delete Product success!", "Thong bao");
            this.diaglog.close('DelCustomer');
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
}

