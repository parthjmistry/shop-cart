import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './Admin/addproduct/addproduct.component';
import { ListproductComponent } from './Admin/listproduct/listproduct.component';
import { CartComponent } from './Cart/cart/cart.component';
import { CheckoutComponent } from './Checkout/checkout/checkout.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { LoginComponent } from './User/login/login.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';
import { UserAddComponent } from './User/user-add/user-add.component';
import { UserDetailsComponent } from './User/user-details/user-details.component';
import { UserListComponent } from './User/user-list/user-list.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'shop', component: ProductListComponent },
  { path: 'product-details', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'user-add', component: UserAddComponent },

  { path: 'admin/list-product', component: ListproductComponent },
  { path: 'admin/add-product', component: AddproductComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
