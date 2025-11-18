import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductBasicComponent } from '../product-basic/product-basic.component';
import { Product, ProductCategories, ProductCreateRequest, ProductStatuses } from '../../../models/product.model';
import { MATERIAL_MODULES } from '../../../shared/material.imports';

@Component({
  selector: 'app-product-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MATERIAL_MODULES,
  ],
  templateUrl: './product-edit.html',
})
export class ProductEdit extends ProductBasicComponent implements OnInit {
  private fb = inject(FormBuilder);

  readonly categories = Object.values(ProductCategories);
  readonly statuses = Object.values(ProductStatuses);

  form!: FormGroup;
  product?: Product;
  isEditMode = false;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode()
  }

  private checkEditMode(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.isEditMode = true;
        const products = this.productService.products();
        this.product = products?.find((p) => p.id === id);
        if (this.product) {
          this.populateForm(this.product);
        }
      }
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', Validators.required],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      status: ['', Validators.required],
    });
  }

  private populateForm(product: Product): void {
    this.form.patchValue({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const productData: ProductCreateRequest = {
      name: formValue.name,
      category: formValue.category,
      price: Number(formValue.price),
      stock: Number(formValue.stock),
      status: formValue.status,
    };

    if (this.isEditMode && this.product) {
      this.productService.updateProduct(this.product.id, productData as Product);
    } else {
      this.productService.createProduct(productData);
    }

    this.goBack();
  }

  cancel(): void {
    this.goBack();
  }
}
