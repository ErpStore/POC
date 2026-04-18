import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ProductsStoreService } from '../services/products-store.service';

@Component({
  selector: 'app-add-product-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly productsStore = inject(ProductsStoreService);
  private readonly router = inject(Router);

  protected readonly isSubmitting = signal(false);
  protected readonly categories = this.productsStore.categories;
  protected readonly brands = this.productsStore.brands;
  protected readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    sku: ['', [Validators.required, Validators.minLength(4)]],
    barcode: ['', [Validators.required, Validators.minLength(8)]],
    category: ['', Validators.required],
    brand: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    status: ['ACTIVE' as const, Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.productsStore.addProduct(this.form.getRawValue());
    this.form.reset({
      name: '',
      description: '',
      sku: '',
      barcode: '',
      category: '',
      brand: '',
      price: 0,
      stock: 0,
      status: 'ACTIVE',
    });
    void this.router.navigateByUrl('/products');
  }

  protected hasError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }
}