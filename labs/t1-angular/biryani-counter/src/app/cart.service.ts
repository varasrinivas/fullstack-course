import { Injectable } from '@angular/core';

// m04 - the ONE shared cart clipboard, held by the manager (the injector)
@Injectable({ providedIn: 'root' })
export class CartService {
  items: string[] = [];
  add(item: string) { this.items.push(item); }
}
