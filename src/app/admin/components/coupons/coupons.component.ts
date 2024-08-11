import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {


  coupons:any;
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons(){
    this.sv.getAllCoupon().subscribe((res)=>{
      this.coupons = res;
      console.log(res);
    })
  }

}
