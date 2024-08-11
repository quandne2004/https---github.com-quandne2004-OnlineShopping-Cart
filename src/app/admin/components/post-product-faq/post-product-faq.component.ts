import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrls: ['./post-product-faq.component.scss']
})
export class PostProductFaqComponent implements OnInit {


productId:number= this.active.snapshot.params['productId'];
FAQForm!:FormGroup;
  constructor(private fb:FormBuilder,private route:Router,private sv:AdminService,private snack:MatSnackBar,private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.FAQForm = this.fb.group({
      question:[null,[Validators.required]],
      answer:[null,[Validators.required]]
    })
  }


  postFaq(){
    this.sv.postFAQ(this.productId,this.FAQForm.value).subscribe((res)=>{
      if(res.id !=null){
        this.snack.open("Success","Close",{duration:5000});
        this.route.navigateByUrl("/admin/dashboard");
      }else{
        this.snack.open("Error","Close",{duration:5000,panelClass:'error-snackbar'});
      }
    })
  }

}
