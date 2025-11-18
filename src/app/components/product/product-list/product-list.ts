import { ChangeDetectionStrategy, Component, ViewChild, AfterViewInit, OnInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductBasicComponent } from '../product-basic/product-basic.component';
import { RouteProduct } from '../../../app.routes';
import { Product, ProductCategories, ProductStatuses } from '../../../models/product.model';
import { MATERIAL_MODULES } from '../../../shared/material.imports';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    MATERIAL_MODULES,
  ],
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList extends ProductBasicComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private nameFilterSubject = new Subject<string>();

  readonly categories = Object.values(ProductCategories);
  readonly statuses = Object.values(ProductStatuses);

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'stock', 'status'];
  products = this.productService.products;
  dataSource = new MatTableDataSource<Product>([]);

  filterName = signal('');
  filterCategory = signal('');
  filterStatus = signal('');

  ngOnInit(): void {
    this.productService.loadProductsFromApi();
    
    this.nameFilterSubject.pipe(debounceTime(300)).subscribe((value) => {
      this.filterName.set(value);
      this.applyFilters();
    });
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Počet produktů";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onNameFilterChange(value: string): void {
    this.nameFilterSubject.next(value);
  }

  onCategoryFilterChange(value: string): void {
    this.filterCategory.set(value);
    this.applyFilters();
  }

  onStatusFilterChange(value: string): void {
    this.filterStatus.set(value);
    this.applyFilters();
  }

  resetFilters(): void {
    this.filterName.set('');
    this.filterCategory.set('');
    this.filterStatus.set('');
    this.nameFilterSubject.next('');
    this.applyFilters();
  }

  private applyFilters(): void {
    const name = this.filterName().toLowerCase();
    const category = this.filterCategory();
    const status = this.filterStatus();

    this.dataSource.filterPredicate = (product: Product, filter: string) => {
      const nameMatch = !name || product.name.toLowerCase().includes(name);
      const categoryMatch = !category || product.category === category;
      const statusMatch = !status || product.status === status;
      return nameMatch && categoryMatch && statusMatch;
    };

    this.dataSource.filter = `${name}|${category}|${status}`;
  }

  createProduct() {
    this.router.navigate([`/${RouteProduct.create}`]);
  }

  redirectDetail(id: number) {
    this.router.navigate([`/${RouteProduct.detail}`, id]);
  }

   private updateDataSource = effect(() => {
    this.dataSource.data = this.products();
  });
}