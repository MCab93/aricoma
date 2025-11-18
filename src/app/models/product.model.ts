export const ProductCategories = {
  Electronics: 'Electronics',
  Clothing: 'Clothing',
  Books: 'Books',
  Toys: 'Toys'
};

export type ProductCategory = typeof ProductCategories[keyof typeof ProductCategories];

export const ProductStatuses = {
  Active: 'Active',
  Inactive: 'Inactive'
};

export type ProductStatus = typeof ProductStatuses[keyof typeof ProductStatuses];

export interface Product {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
    status: ProductStatus
}

export interface ProductCreateRequest {
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
    status: ProductStatus
}