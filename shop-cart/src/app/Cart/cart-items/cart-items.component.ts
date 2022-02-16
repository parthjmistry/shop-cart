import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartModel } from '../Models/cart-model';
import { CartServiceService } from '../Services/cart-service.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  Products: CartModel[] = [];
  NewProduct: CartModel = new CartModel();

  // Cart: CartModel[] = [];

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
  }

  AddToCart() {
    this.CartService.AddItemToCart(this.NewProduct);
  }

  EditItem(Action: string, ProdutId: number) {
    if (Action === 'Add') {
      this.Products.filter((List) => List.Id === ProdutId).map(
        (List) => ((List.Qty += 1), (List.Amount = List.Price * List.Qty))
      );
    } else {
      this.Products.filter((List) => List.Id === ProdutId).map(
        (List) => (
          List.Qty == 0 ? 0 : (List.Qty -= 1),
          (List.Amount = List.Price * List.Qty)
        )
      );
    }
  }

  ClearCart() {
    this.Products = [];
    this.router.navigateByUrl('cart');
  }
}
