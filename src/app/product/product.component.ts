import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ApiService } from '../services/product/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDiaglogDeleteComponent } from './product-diaglog-delete/product-diaglog-delete.component';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

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

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions !: Observable<string[]>;


  constructor(
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.getAllProducts();

    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

          console.log('res.data', res.data)

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].amount > 0) {
              this.options.push(`${res.data[i].fullName}`);
            }
          }
          console.log(res.data.results);

        },
        error: (err) => { console.log(err); }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // filter name
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.fullName.toLowerCase().includes(filter);
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
