import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss'],
})
export class ProductDeleteComponent {
  id: number;

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) dataParams: any,
    public productService: ProductService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    this.id = dataParams.id;
  }

  deleteProduct(): void {
    this.productService.delete(this.id).subscribe(() => {
      this.productService.showMenssage('Produto excluido com sucesso');
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