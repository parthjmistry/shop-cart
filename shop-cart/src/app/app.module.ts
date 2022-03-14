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
import { NewArrivalsProductsComponent } from './Components/new-arrivals-products/new-arrivals-products.component';
import { CartComponent } from './Cart/cart/cart.component';
import { CheckoutComponent } from './Checkout/checkout/checkout.component';
//import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAddComponent } from './User/user-add/user-add.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { AddproductComponent } from './Admin/addproduct/addproduct.component';
import { ListproductComponent } from './Admin/listproduct/listproduct.component';
import { NgxPaginationModule } from 'ngx-pagination';
 
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductImageComponent } from './Admin/product-image/product-image.component';
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
    NewArrivalsProductsComponent,
    CartComponent,
    CheckoutComponent,
    UserAddComponent,
    AddproductComponent,
    ListproductComponent,
    ProductImageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    
    DataTablesModule, 
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [BsDatepickerConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
