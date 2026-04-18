export type ProductStatus = 'ACTIVE' | 'DRAFT';

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  barcode: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: ProductStatus;
  createdAt: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  sku: string;
  barcode: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: ProductStatus;
}