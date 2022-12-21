import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BuyorderService } from '../services/buyorder/buyorder.service';
import { Router } from '@angular/router';
import { BuyorderDiaglogDeleteComponent } from './buyorder-diaglog-delete/buyorder-diaglog-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-buyorder',
  templateUrl: './buyorder.component.html',
  styleUrls: ['./buyorder.component.css']
})
export class BuyorderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'orderNo', 'totalPrice', 'customer.fullName', 'Action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private buyorderApi: BuyorderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllBuyOrder();
  }

  getAllBuyOrder() {
    this.buyorderApi.getBuyOrder().subscribe(
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
    this.router.navigate(['/BuyOrder/edit/' + row.id]);
  }
  openDialogDelBuyOrder(row: any) {
    console.log(row);
    this.dialog.open(BuyorderDiaglogDeleteComponent, { width: '300px', data: row })
      .afterClosed().subscribe(val => {
        if (val == 'buyOrderDelete') {
          this.getAllBuyOrder();
        }
      });
  }
}
