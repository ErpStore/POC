import { computed, effect, Injectable, signal } from '@angular/core';

import { CreateProductInput, Product } from '../models/product.model';

const STORAGE_KEY = 'product-catalog-demo-products';

const SEED_PRODUCTS: Product[] = [
  {
    id: 'p-101',
    name: 'Coca Cola 500ml',
    description: 'Refreshing soft drink',
    sku: 'COKE-500',
    barcode: '8901764012220',
    category: 'Beverages',
    brand: 'Coca Cola',
    price: 40,
    stock: 150,
    status: 'ACTIVE',
    createdAt: '2026-04-10T10:00:00.000Z',
  },
  {
    id: 'p-102',
    name: 'Amul Butter 100g',
    description: 'Pure milk butter',
    sku: 'AMUL-B-100',
    barcode: '8901262010012',
    category: 'Dairy & Eggs',
    brand: 'Amul',
    price: 56,
    stock: 80,
    status: 'ACTIVE',
    createdAt: '2026-04-11T11:30:00.000Z',
  },
  {
    id: 'p-103',
    name: 'Slim Fit Shirt',
    description: 'Cotton formal shirt',
    sku: 'TS-SF-001',
    barcode: '8901234567890',
    category: "Men's Wear",
    brand: 'Zara',
    price: 1299,
    stock: 25,
    status: 'ACTIVE',
    createdAt: '2026-04-12T09:15:00.000Z',
  },
  {
    id: 'p-104',
    name: 'Galaxy S24 Ultra',
    description: 'Flagship smartphone',
    sku: 'SAM-S24U',
    barcode: '8806095300000',
    category: 'Mobiles',
    brand: 'Samsung',
    price: 129999,
    stock: 12,
    status: 'ACTIVE',
    createdAt: '2026-04-12T16:45:00.000Z',
  },
  {
    id: 'p-105',
    name: 'Classic Basmati Rice 5kg',
    description: 'Premium long grain rice',
    sku: 'RICE-5KG',
    barcode: '8907001004455',
    category: 'Staples',
    brand: 'India Gate',
    price: 699,
    stock: 42,
    status: 'ACTIVE',
    createdAt: '2026-04-13T08:20:00.000Z',
  },
  {
    id: 'p-106',
    name: 'Noise Smart Watch',
    description: 'Fitness tracking smartwatch',
    sku: 'NOISE-SW-01',
    barcode: '8906100002211',
    category: 'Wearables',
    brand: 'Noise',
    price: 3999,
    stock: 18,
    status: 'DRAFT',
    createdAt: '2026-04-14T13:00:00.000Z',
  },
];

@Injectable({ providedIn: 'root' })
export class ProductsStoreService {
  readonly products = signal<Product[]>(this.loadProducts());

  readonly categories = computed(() => this.uniqueValues('category'));
  readonly brands = computed(() => this.uniqueValues('brand'));

  constructor() {
    effect(() => {
      if (typeof localStorage === 'undefined') {
        return;
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products()));
    });
  }

  addProduct(input: CreateProductInput): Product {
    const product: Product = {
      ...input,
      id: `product-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    this.products.update((currentProducts) => [product, ...currentProducts]);
    return product;
  }

  private loadProducts(): Product[] {
    if (typeof localStorage === 'undefined') {
      return SEED_PRODUCTS;
    }

    const rawProducts = localStorage.getItem(STORAGE_KEY);

    if (!rawProducts) {
      return SEED_PRODUCTS;
    }

    try {
      const parsedProducts = JSON.parse(rawProducts) as Product[];
      return parsedProducts.length > 0 ? parsedProducts : SEED_PRODUCTS;
    } catch {
      return SEED_PRODUCTS;
    }
  }

  private uniqueValues(key: 'category' | 'brand'): string[] {
    return [...new Set(this.products().map((product) => product[key]))].sort((left, right) =>
      left.localeCompare(right),
    );
  }
}