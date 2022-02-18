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
  Products: CartModel[] = [];
  NewProduct: CartModel = new CartModel();
  Cart: CartModel[] = [];
  CartItemNew: CartModelNew[] = [];

  constructor(
    private router: Router,
    private CartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.CartService.Products$.subscribe((res) => {
      this.Products = res;
      console.log('----------------------------');
      console.log(res);
    });

    this.CartItemNew = JSON.parse(localStorage.getItem('cartItem') || '{}');
  }

  AddToCart() {
    this.CartService.AddItemToCart(this.NewProduct);
  }

  EditItem(Action: string, ProdutId: number) {
    if (Action === 'Add') {
      this.CartItemNew.filter((List) => List.id === ProdutId).map(
        (List) => (List.Qty += 1)
      );
    } else {
      this.CartItemNew.filter((List) => List.id === ProdutId).map((List) =>
        List.Qty > 1 ? (List.Qty -= 1) : 1
      );
    }
  }

  deleteCartItem(itemId: number) {
    if (confirm('Are you sure you want to delete item from cart?')) {
      const currentArray = this.CartItemNew;
      for (let i = 0; i < currentArray.length; ++i) {
        if (currentArray[i].id === itemId) {
          currentArray.splice(i, 1);
        }
      }
      localStorage.setItem('cartItem', JSON.stringify(currentArray));
    }
  }

  ClearCart() {
    this.Products = [];
    this.router.navigateByUrl('cart');
  }
}
