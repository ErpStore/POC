import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'products',
	},
	{
		path: 'products',
		loadComponent: () =>
			import('./features/products/pages/products-overview-page.component').then(
				(module) => module.ProductsOverviewPageComponent,
			),
	},
	{
		path: 'products/new',
		loadComponent: () =>
			import('./features/products/pages/add-product-page.component').then(
				(module) => module.AddProductPageComponent,
			),
	},
	{
		path: '**',
		redirectTo: 'products',
	},
];
