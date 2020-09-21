import { IProduct } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  product: IProduct = {
    name: '',
    price: null
  }

  constructor(
    public productService: ProductService,
    public router: Router,
    formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      id: [null, null],
      name: ['', [Validators.minLength(5), Validators.maxLength(255)]],
      price: [0, [Validators.min(0.01), Validators.required]],
    });

    this.form.valueChanges.subscribe(() => {
      for (const key in this.form.controls) {
        const control = this.form.controls[key];

        console.log(key, control.valid);
      }
    });
  }

  ngOnInit(): void {

  }

  submit(): void {
    const product: IProduct = {
      name: this.form.get('name').value,
      price: this.form.get('price').value,
    };

    this.productService.create(product).subscribe(() => {
      this.productService.showMenssage('Operação executada com sucesso ');
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  getControl(name: string) {
    return this.form.get(name);
  }
}
