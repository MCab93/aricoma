import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCreateRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  http = inject(HttpClient);  
  private apiUrl = 'https://api.mockfly.dev/mocks/7a1c2c91-e14d-4102-8c23-023cf2cfcc36';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductCreateRequest): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductCreateRequest): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
