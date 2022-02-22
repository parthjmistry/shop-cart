import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../Models/cart-model';
import { CartModelNew } from '../Models/cart-model';
import { CartServiceService } from '../Services/cart-service.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  CartItems: CartModelNew[] = [];

  constructor(
    private router: Router,
    private _cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.CartItems = JSON.parse(localStorage.getItem('cartItem') || '{}');
  }

  EditItem(Action: string, ProdutId: number) {
    if (Action === 'Add') {
      this.CartItems.filter((List) => List.id === ProdutId).map(
        (List) => (List.Qty += 1)
      );
    } else {
      this.CartItems.filter((List) => List.id === ProdutId).map((List) =>
        List.Qty > 1 ? (List.Qty -= 1) : 1
      );
    }

    localStorage.setItem('cartItem', JSON.stringify(this.CartItems));
    this._cartService.setCartItemCount();
  }

  deleteCartItem(itemId: number) {
    if (confirm('Are you sure you want to delete item from cart?')) {
      const currentArray = this.CartItems;
      for (let i = 0; i < currentArray.length; ++i) {
        if (currentArray[i].id === itemId) {
          currentArray.splice(i, 1);
        }
      }
      localStorage.setItem('cartItem', JSON.stringify(currentArray));
      this._cartService.setCartItemCount();
    }
  }

  ClearCart() {
    localStorage.removeItem('cartItem');
    this._cartService.setCartItemCount();
    this.reloadComponent();
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
