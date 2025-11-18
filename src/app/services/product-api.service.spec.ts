import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductApiService } from './product-api.service';
import { Product, ProductCategories, ProductStatuses } from '../models/product.model';

describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch a product by id (getProduct)', (done) => {
    const mockProduct: Product = {
      id: 42,
      name: 'Test produkt',
      category: ProductCategories.Electronics,
      price: 123.45,
      stock: 10,
      status: ProductStatuses.Active
    };

    service.getProduct(42).subscribe((product) => {
      expect(product).toEqual(mockProduct);
      done();
    });

    const req = httpMock.expectOne((req) => req.method === 'GET' && req.url.endsWith('/42'));
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should delete a product by id (deleteProduct)', (done) => {
    service.deleteProduct(42).subscribe(() => {
      expect(true).toBeTrue();
      done();
    });

    const req = httpMock.expectOne((req) => req.method === 'DELETE' && req.url.endsWith('/42'));
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
