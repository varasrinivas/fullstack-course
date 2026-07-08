import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
})
export class Menu {
  cart = inject(CartService); // "manager, the clipboard please"
}
