import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';
import { ReviewOrderProductComponent } from './components/review-order-product/review-order-product.component';
import { ViewProductDetailsComponent } from './components/view-product-details/view-product-details.component';
import { ViewWishListComponent } from './components/view-wish-list/view-wish-list.component';

const routes: Routes = [{ path: '', component: CustomerComponent },
  {path:'dashboard',component:DashboardComponent},
  {path:'cart',component:CartComponent},
  {path:'my_orders',component:MyOrdersComponent},
  {path:'ordered_products/:orderId',component:ViewOrderedProductsComponent},
  {path:'review/:productId',component:ReviewOrderProductComponent},
  {path:'product/:productId',component:ViewProductDetailsComponent},
  {path:'wishlist',component:ViewWishListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
