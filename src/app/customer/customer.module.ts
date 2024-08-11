import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoAngularMaterialModules } from '../DemoAngularMaterialModules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';
import { ReviewOrderProductComponent } from './components/review-order-product/review-order-product.component';
import { ViewProductDetailsComponent } from './components/view-product-details/view-product-details.component';
import { ViewWishListComponent } from './components/view-wish-list/view-wish-list.component';


@NgModule({
  declarations: [
    CustomerComponent,
    DashboardComponent,
    CartComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    ViewOrderedProductsComponent,
    ReviewOrderProductComponent,
    ViewProductDetailsComponent,
    ViewWishListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoAngularMaterialModules,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class CustomerModule { }
