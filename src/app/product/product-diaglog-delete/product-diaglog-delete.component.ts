import { Component, Inject, OnInit } from '@angular/core';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/product/api.service';
@Component({
  selector: 'app-product-diaglog-delete',
  templateUrl: './product-diaglog-delete.component.html',
  styleUrls: ['./product-diaglog-delete.component.css']
})
export class ProductDiaglogDeleteComponent implements OnInit {


  constructor(
    private api: ApiService,
    private diaglog: MatDialogRef<ProductDiaglogDeleteComponent>,
    private notifyService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public DeleteData: any,
  ) { }
  name = "";

  ngOnInit(): void {
    console.log(this.DeleteData);
    this.name = this.DeleteData.fullName;
  }

  deleteProduct() {
    this.api.delProduct(this.DeleteData.id)
      .subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.notifyService.showSuccess("Delete Product success!", "Thong bao");
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
