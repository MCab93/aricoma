import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-basic',
  template: ''
})
export class ProductBasicComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  goBack() {
    this.router.navigate(['/']);
  }
}
