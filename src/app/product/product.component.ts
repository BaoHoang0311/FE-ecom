import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    
  }

  openDialog() {
    this.dialog.open(ProductDialogComponent, {
        width : '30%',
        height : '30%',
    });
  }
}
