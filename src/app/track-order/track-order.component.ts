import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {


  searchOrderForm!:FormGroup;
  order:any;
  constructor(private sv:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.searchOrderForm = this.fb.group({
      trackingId:[null,[Validators.required]]
    })
  }

  submitForm(){
    this.sv.getOrderByTrackingId(this.searchOrderForm.get('trackingId').value).subscribe((res)=>{
      console.log(res);
      this.order = res;
    })
  }
}
