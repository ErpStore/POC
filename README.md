# Product Catalog Frontend

This workspace contains a frontend-only Angular 21 demo for a product catalog flow with dummy data.

## What is included

- `Display Products` screen with inventory summary cards, search, filter, and seeded mock products.
- `Add Product` screen with reactive-form validation and navigation back to the inventory screen.
- Local browser persistence through `localStorage`, so newly added products stay visible across refreshes on the same machine.
- Lazy-loaded product routes and standalone Angular components.

## Run locally

```bash
npm start
```

Open `http://localhost:4200/` after the dev server starts.

## Build

```bash
npm run build
```

The production build output is generated under `dist/product-catalog/`.

## Test

```bash
npm test -- --watch=false
```

## Current frontend structure

- `src/app/features/products/pages/products-overview-page.component.*` renders the inventory-style list screen.
- `src/app/features/products/pages/add-product-page.component.*` renders the add-product form screen.
- `src/app/features/products/services/products-store.service.ts` holds the mock state and seed data.
- `src/app/features/products/models/product.model.ts` defines the product contract that can later map to backend APIs.

## Next backend step

When you are ready to connect APIs, replace the write and read logic inside `ProductsStoreService` with `POST /products` and `GET /products` calls while keeping the page components unchanged.
