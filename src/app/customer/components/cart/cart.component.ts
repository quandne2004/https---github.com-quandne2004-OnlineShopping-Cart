import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cartItems: any[]=[];
  order:any;
  couponForm!:FormGroup;
  constructor(private sv:CustomerService,private snack:MatSnackBar,private fb:FormBuilder,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getCart();
    this.couponForm = this.fb.group({
      code:[null,[Validators.required]]
    })
  }

  getCart(){
    this.cartItems = [];
    this.sv.getCartByUserId().subscribe((res)=>{
      this.order = res;
      res.cartItems.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      })
    })
  }


  applyCoupon(){
    this.sv.applyCoupon(this.couponForm.get(['code']).value).subscribe((res)=>{
      this.snack.open("Success","Close",{duration:5000});
      this.getCart();
    },error=>{
      this.snack.open("Error","Close",{duration:5000});
    })
  }

  increaseProduct(productId:any){
    this.sv.increaseProduct(productId).subscribe((res)=>{
      this.snack.open("Success","Close",{duration:5000});
      this.getCart();
    })
  }

  decreaseProduct(productId:any){
    this.sv.decreaseProduct(productId).subscribe((res)=>{
      this.snack.open("Success","Close",{duration:5000});
      this.getCart();
    })
  }

  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }

}
