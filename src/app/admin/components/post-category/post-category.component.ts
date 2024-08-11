import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {


  postForm!:FormGroup;

  constructor(private fb:FormBuilder,private sv:AdminService,private snack:MatSnackBar,private route:Router) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      name:[null,[Validators.required]],
      description:[null,[Validators.required]]
    })
  }

  addCategory():void{
    if(this.postForm.valid){
      this.sv.postCategory(this.postForm.value).subscribe((res)=>{
        if(res.id !=null){
          this.snack.open("Success","Close",{duration:5000});
          this.route.navigateByUrl("/admin/dashboard");
        }else{
          this.snack.open("Error","Close",{duration:5000,panelClass:'error-snackbar'});
        }
      })
    }else{
      this.postForm.markAllAsTouched();
    }
  }


}
