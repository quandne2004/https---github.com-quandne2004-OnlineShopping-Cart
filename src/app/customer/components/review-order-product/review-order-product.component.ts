import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from 'src/app/service/storage/user-storage.service';

@Component({
  selector: 'app-review-order-product',
  templateUrl: './review-order-product.component.html',
  styleUrls: ['./review-order-product.component.scss']
})
export class ReviewOrderProductComponent implements OnInit {


  productId:number = this.active.snapshot.params["productId"];

  reviewForm!:FormGroup;
  selectedFile:File|null;
  imagePreview:string | ArrayBuffer | null;
  constructor(private fb:FormBuilder,private snack:MatSnackBar, private sv:CustomerService,private route:Router,private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating:[null,[Validators.required]],
      description:[null,[Validators.required]]
    })
  }

  onFileSeleted(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader =new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(this.selectedFile);
  }

  submitForm(){

    const formData = new FormData();

    formData.append('img',this.selectedFile);
    formData.append('productId',this.productId.toString());
    formData.append('userId',UserStorageService.getUserId().toString());
    formData.append('rating',this.reviewForm.get('rating').value);
    formData.append('description',this.reviewForm.get('description').value);
    this.sv.giveReview(formData).subscribe((res)=>{
      if(res.id !=null){
        this.snack.open("Success","Close",{duration:5000});
        this.route.navigateByUrl("/customer/my_orders");
      }else{
        this.snack.open("Error","Close",{duration:5000});
      }
    })
  }


}
