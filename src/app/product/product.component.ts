import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ApiService } from '../services/product/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDiaglogDeleteComponent } from './product-diaglog-delete/product-diaglog-delete.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'amount', 'Action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog: MatDialog,
    private api: ApiService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(ProductDialogComponent, { width: '30%', height: '50%', })
      .afterClosed().subscribe(val => {
        if (val == 'saveProduct') {
          this.getAllProducts();
        }
      });
  }

  openDialogDelProduct(row: any) {
    this.dialog.open(ProductDiaglogDeleteComponent, { width: '300px', data: row })
      .afterClosed().subscribe(val => {
        if (val == 'abcd') {
          this.getAllProducts();
        }
      });
  }

  editProduct(row: any) {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      height: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'updateProduct') {
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.api.getProduct().subscribe(
      {
        next: (res) => {
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
        },
        error: (err) => { console.log(err); }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
