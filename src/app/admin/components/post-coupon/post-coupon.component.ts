import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrls: ['./post-coupon.component.scss']
})
export class PostCouponComponent implements OnInit {


  couponForm!:FormGroup;
  constructor(private sv:AdminService,private snack:MatSnackBar,private route:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      name:[null,[Validators.required]],
      code:[null,[Validators.required]],
      discount:[null,[Validators.required]],
      expirationDate:[null,[Validators.required]]
    })
  }

  addCoupon(){
    if(this.couponForm.valid){
      this.sv.createCoupon(this.couponForm.value).subscribe((res)=>{
        if(res.id != null){
          this.snack.open("Success","Close",{duration:5000})
          this.route.navigateByUrl("/admin/dashboard");
        }
      },error=>{
        this.snack.open("Error","Close",{duration:5000,panelClass:'error-snackbar'});
      })
    }else{
      this.couponForm.markAllAsTouched();
    }
  }

}
