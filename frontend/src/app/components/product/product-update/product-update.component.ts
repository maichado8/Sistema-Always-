import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnDestroy {

  product: IProduct = {
    id: null,
    name: '',
    price: null,
  };

  request: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) dataParams: any,
    public productService: ProductService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    this.loadProduct(dataParams.id);
  }
  ngOnDestroy() {
    if (this.request) {
      this.request.unsubscribe();
    }
  }
    
  loadProduct(id: number): void {
    this.request = this.productService.readById(id).subscribe((response: IProduct) => {
      this.product = response;
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMenssage("Produto atualizado com sucesso");
      this.close(true);
    });
  }

  cancel(): void {
    this.close();
  }

  close(update: boolean = false): void {
    this.dialogRef.close(update); 
  }
} 