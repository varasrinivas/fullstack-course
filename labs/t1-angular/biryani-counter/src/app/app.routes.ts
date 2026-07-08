import { Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Cart } from './cart/cart';

// m04 - floor signage: URL → component
export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: Menu },
  { path: 'cart', component: Cart },
];
