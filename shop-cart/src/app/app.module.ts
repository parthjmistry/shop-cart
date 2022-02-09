import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { HomeBannerComponent } from './Components/home-banner/home-banner.component';
import { OfferBannerComponent } from './Components/offer-banner/offer-banner.component';
import { HotProductsComponent } from './Components/hot-products/hot-products.component';
import { TestimonialsComponent } from './Components/testimonials/testimonials.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';
import { RelatedProductsComponent } from './Product/related-products/related-products.component';
import { CartItemsComponent } from './Cart/cart-items/cart-items.component';
import { ShippingMethodsComponent } from './Cart/shipping-methods/shipping-methods.component';
import { BillingDetailsComponent } from './Checkout/billing-details/billing-details.component';
import { OrderDetailsComponent } from './Checkout/order-details/order-details.component';
import { PaymentMethodsComponent } from './Checkout/payment-methods/payment-methods.component';
import { LoginComponent } from './User/login/login.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { UserDetailsComponent } from './User/user-details/user-details.component';
import { HomePageComponent } from './Components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeBannerComponent,
    OfferBannerComponent,
    HotProductsComponent,
    TestimonialsComponent,
    SidebarComponent,
    ProductListComponent,
    ProductDetailComponent,
    RelatedProductsComponent,
    CartItemsComponent,
    ShippingMethodsComponent,
    BillingDetailsComponent,
    OrderDetailsComponent,
    PaymentMethodsComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    UserListComponent,
    UserDetailsComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
