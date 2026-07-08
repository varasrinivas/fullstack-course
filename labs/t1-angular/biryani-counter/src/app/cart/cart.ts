import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
})
export class Cart {
  cart = inject(CartService); // the SAME clipboard the menu wrote on
}
