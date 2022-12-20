import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../services/order/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderDetailProductComponent } from './order-detail/order-detail-product/order-detail-product.component';
import { OrderDiaglogDeleteComponent } from './order-diaglog-delete/order-diaglog-delete.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'orderNo', 'totalPrice', 'customer.fullName', 'Action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private orderApi: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getAllOrder();
  }

  getAllOrder() {
    this.orderApi.getOrder().subscribe(
      {
        next: (res) => {
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(res.data);
        },
        error: (err) => { console.log(err); }
      });
  }


  openForEdit(row: any) {
    this.router.navigate(['/Order/edit/' + row.id]);
    // lấy cái roid làm việc

  }


  openDialogDelOrder(row: any) {
    console.log(row);
    this.dialog.open(OrderDiaglogDeleteComponent, { width: '300px', data: row })
      .afterClosed().subscribe(val => {
        if (val == 'abcd') {
          this.getAllOrder();
        }
      });
  }
}
