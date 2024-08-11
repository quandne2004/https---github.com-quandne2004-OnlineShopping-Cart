import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  orderForm!:FormGroup;
  listOfPayment = ["Techcombank:19036320228013","Come to Shop and paid"];
  constructor(private fb:FormBuilder,private snack:MatSnackBar,private sv:CustomerService,private route:Router,private dialog:MatDialog) { }

  ngOnInit(): void {

    this.orderForm = this.fb.group({
      address:[null,[Validators.required]],
      orderDescription:[null],
      payment:[null,[Validators.required]]
    })
  }

  placeOrder(){
    this.sv.placeOrder(this.orderForm.value).subscribe((res)=>{
      if(res.id != null){
        this.snack.open("Success","Close",{duration:5000})
        this.route.navigateByUrl("/customer/my_orders");
        this.closeForm();
      }else{
        this.snack.open("Error","Close",{duration:5000});
      }
    })
  }

  closeForm(){
    this.dialog.closeAll();
  }

}
