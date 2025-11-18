import { Injectable } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Product } from '../models/product.model';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

@Injectable({
  providedIn: 'root',
})
export class ProductStore extends signalStore(
  withState(initialState),
  withComputed(({ products }) => ({
    productCount: computed(() => products().length),
  })),
  withMethods((store) => ({
    loadProducts: (data: Product[]) => {
      patchState(store, { products: data });
    },

    updateProduct: (id: number, updates: Partial<Product>) => {
      const products = store.products().map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      patchState(store, { products });
    },

    deleteProduct: (id: number) => {
      const products = store.products().filter((p) => p.id !== id);
      patchState(store, { products });
    },

    getProductById: (id: number) => {
      return computed(() => store.products().find((p) => p.id === id));
    },

  }))
) {}
