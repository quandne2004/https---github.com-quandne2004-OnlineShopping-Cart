import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {


  myOrders:any = [];
  constructor(private sv:CustomerService) { }

  ngOnInit(): void {
    this.getMyOrders();
  }


  getMyOrders(){
    this.sv.getOrderByUserId().subscribe((res)=>{
      this.myOrders = res;
      console.log(res);
    })
  }

}
