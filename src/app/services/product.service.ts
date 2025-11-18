import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { ProductCreateRequest } from '../models/product.model';
import { ProductApiService } from './product-api.service';
import { ProductStore } from '../store/product.store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiService = inject(ProductApiService);
  private store = inject(ProductStore);

  loadProductsFromApi(): void {
    this.apiService.getProducts()
      .pipe(
        catchError((error) => {
          console.error('Chyba při načítání produktů', error);
          return of([]);
        })
      )
      .subscribe((products) => {
        this.store.loadProducts(products);
      });
  }

  createProduct(product: ProductCreateRequest): void {
    this.apiService.createProduct(product)
      .pipe(
        catchError((error) => {
          console.error('Chyba při vytváření produktu', error);
          return EMPTY;
        })
      )
      .subscribe((products) => {
        this.store.loadProducts(products);
      });
  }

  updateProduct(id: number, updates: ProductCreateRequest): void {
    this.apiService.updateProduct(id, updates)
      .pipe(
        catchError((error) => {
          console.error('Chyba při aktualizaci produktu', error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.store.updateProduct(id, updates);
      });
  }

  deleteProduct(id: number): void {
    this.apiService.deleteProduct(id)
      .pipe(
        catchError((error) => {
          console.error('Chyba při mazání produktu', error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.store.deleteProduct(id);
      });
  }

  get products() {
    return this.store.products;
  }

  getProductById(id: number) {
    return this.store.getProductById(id);
  }
}
