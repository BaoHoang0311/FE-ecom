import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification/notification.service';
import { BuyorderService } from 'src/app/services/buyorder/buyorder.service';

@Component({
  selector: 'app-buyorder-diaglog-delete',
  templateUrl: './buyorder-diaglog-delete.component.html',
})
export class BuyorderDiaglogDeleteComponent implements OnInit {

  constructor(
    private buyorderApi: BuyorderService,
    private diaglog: MatDialogRef<BuyorderDiaglogDeleteComponent>,
    private notifyService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public DeleteBuyOrder: any,
  ) { }
  name = "";

  ngOnInit(): void {
    this.name = this.DeleteBuyOrder.id;
  }

  deleteBuyOrder() {
    this.buyorderApi.delBuyOrder(this.DeleteBuyOrder.id)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notifyService.showSuccess("Delete BuyOrder success!", "Thong bao");
            this.diaglog.close('buyOrderDelete');
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
