import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
orders:any;
  constructor(private sv:AdminService,private snack:MatSnackBar) { }

  ngOnInit(): void {

    this.getAllPlaceOrders();
  }

  getAllPlaceOrders(){
    this.sv.getPlacedOrder().subscribe((res)=>{
      this.orders = res;
      console.log(res);
    })
  }

  changeOrderStatus(orderId:number,status:string){
    this.sv.changeOrderStatus(orderId,status).subscribe((res)=>{
      if(res.id !=null){
        this.snack.open("Success","Close",{duration:5000});
        this.getAllPlaceOrders();
      }else{
        this.snack.open("Error","Close",{duration:5000,panelClass:'error-snackbar'});
      }
    })
  }

}
