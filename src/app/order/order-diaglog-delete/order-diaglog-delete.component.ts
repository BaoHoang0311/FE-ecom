import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification/notification.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-diaglog-delete',
  templateUrl: './order-diaglog-delete.component.html',

})
export class OrderDiaglogDeleteComponent implements OnInit {

  constructor(
    private orderApi: OrderService,
    private diaglog: MatDialogRef<OrderDiaglogDeleteComponent>,
    private notifyService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public DeleteData: any,
  ) { }
  name = "";
  ngOnInit(): void {
    console.log(this.DeleteData);
    this.name = this.DeleteData.id;
  }
  deleteOrder() {
    this.orderApi.delOrder(this.DeleteData.id)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notifyService.showSuccess("Delete Order success!", "Thong bao");
            this.diaglog.close('abcd');
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
