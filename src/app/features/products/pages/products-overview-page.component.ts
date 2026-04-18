import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../models/product.model';
import { ProductsStoreService } from '../services/products-store.service';

@Component({
  selector: 'app-products-overview-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './products-overview-page.component.html',
  styleUrl: './products-overview-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsOverviewPageComponent {
  private readonly productsStore = inject(ProductsStoreService);
  private readonly currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  protected readonly searchTerm = signal('');
  protected readonly statusFilter = signal<'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'DRAFT'>('ALL');
  protected readonly products = this.productsStore.products;
  protected readonly totalStockUnits = computed(() =>
    this.products().reduce((sum, product) => sum + product.stock, 0),
  );
  protected readonly lowStockCount = computed(
    () => this.products().filter((product) => product.stock <= 20 && product.stock > 0).length,
  );
  protected readonly outOfStockCount = computed(
    () => this.products().filter((product) => product.stock === 0).length,
  );
  protected readonly inventoryValue = computed(() =>
    this.products().reduce((sum, product) => sum + product.stock * product.price, 0),
  );
  protected readonly filteredProducts = computed(() => {
    const normalizedSearch = this.searchTerm().trim().toLowerCase();

    return this.products().filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.name, product.sku, product.brand, product.category]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus = (() => {
        switch (this.statusFilter()) {
          case 'IN_STOCK':
            return product.stock > 20;
          case 'LOW_STOCK':
            return product.stock <= 20 && product.stock > 0;
          case 'DRAFT':
            return product.status === 'DRAFT';
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus;
    });
  });

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  protected updateStatusFilter(value: string): void {
    this.statusFilter.set(value as 'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'DRAFT');
  }

  protected formatCurrency(value: number): string {
    return this.currencyFormatter.format(value);
  }

  protected stockState(product: Product): string {
    if (product.status === 'DRAFT') {
      return 'Draft';
    }

    if (product.stock === 0) {
      return 'Out of stock';
    }

    if (product.stock <= 20) {
      return 'Low stock';
    }

    return 'In stock';
  }

  protected stockStateClass(product: Product): string {
    if (product.status === 'DRAFT') {
      return 'is-draft';
    }

    if (product.stock === 0) {
      return 'is-empty';
    }

    if (product.stock <= 20) {
      return 'is-low';
    }

    return 'is-healthy';
  }

  protected trackByProductId(_: number, product: Product): string {
    return product.id;
  }
}