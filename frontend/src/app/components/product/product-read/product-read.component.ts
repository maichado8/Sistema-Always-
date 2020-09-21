import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product.model';
import { ProductService } from '../product.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss']
})
export class ProductReadComponent {
  products: IProduct[];
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadListUpdate();
    this.loadList();
  }

  openModalDelete(product: IProduct): void {
    const config: MatDialogConfig = {
      panelClass: ['modal-delete'],
      disableClose: true,
      autoFocus: false,
      data: {
        id: product.id,
      },
    };

    const dialog = this.dialog.open(ProductDeleteComponent, config);

    dialog.keydownEvents().subscribe((event: any) => {
      if (event.key === 'Escape') {
        dialog.close(false);
      }
    });

    dialog.afterClosed().subscribe((reload) => {
      if (reload) {
        this.loadList();
      }
    });
  }

  loadList() {
    this.productService.read().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  openModalEdit(product: IProduct): void {
    const config: MatDialogConfig = {
      panelClass: ['modal-edit'],
      disableClose: true,
      autoFocus: false,
      data: {
        id: product.id,
      },
    };

    const dialog = this.dialog.open(ProductUpdateComponent, config);

    dialog.keydownEvents().subscribe((event: any) => {
      if (event.key === 'Escape') {
        dialog.close(false);
      }
    });

    dialog.afterClosed().subscribe((reload) => {
      if (reload) {
        this.loadListUpdate();
      }
    });
  }

  loadListUpdate() {
    this.productService.read().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }
}
