import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { error } from 'console';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {


  productForm!:FormGroup;

  listOfCategory:any=[];
  selectedFile:File | null;
  imagePreview:string|ArrayBuffer|null;
  
  constructor(private fb:FormBuilder,private snack:MatSnackBar,private route:Router,private sv:AdminService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name:[null,[Validators.required]],
      categoryId:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]]
    })
    this.getAllCategories();
  }

  onFileSelectedFile(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(this.selectedFile);
  }

  getAllCategories(){
    this.sv.getAllCategory().subscribe((res)=>{
      this.listOfCategory = res;
    })
  }

  addProduct():void{
    if(this.productForm.valid){
      const formData = new FormData();
      formData.append('img',this.selectedFile);
      formData.append('categoryId',this.productForm.get('categoryId').value);
      formData.append('name',this.productForm.get('name').value);
      formData.append('description',this.productForm.get('description').value);
      formData.append('price',this.productForm.get('price').value);

      this.sv.addProduct(formData).subscribe((res)=>{
        if(res.id != null){
        this.snack.open("Success","Close",{duration:5000});
        this.route.navigateByUrl("/admin/dashboard");
        }else{
          this.snack.open("Error","Close",{duration:5000});
        }
     
      })
    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
