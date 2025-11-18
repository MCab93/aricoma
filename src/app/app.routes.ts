import { Routes } from '@angular/router';
import { ProductList } from './components/product/product-list/product-list';
import { ProductDetail } from './components/product/product-detail/product-detail';
import { ProductEdit } from './components/product/product-edit/product-edit';

export enum RouteProduct {
    create = 'product-create',
    detail = 'product-detail',
    edit = 'product-edit',
}

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: `${RouteProduct.detail}/:id`, component: ProductDetail },
  { path: `${RouteProduct.edit}/:id`, component: ProductEdit },
  { path: RouteProduct.create, component: ProductEdit },
  { path: '**', redirectTo: '' }
];
