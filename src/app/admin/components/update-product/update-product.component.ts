import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {


  productForm!:FormGroup;

  listOfCategory:any=[];
  selectedFile:File | null;
  imagePreview:string|ArrayBuffer|null;
  productId= this.active.snapshot.params["productId"];

  existingImage:string|null=null;
  imgChanged = false;
  
  constructor(private fb:FormBuilder,private snack:MatSnackBar,private route:Router,private sv:AdminService,private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name:[null,[Validators.required]],
      categoryId:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]]
    })
    this.getAllCategories();
    this.getProductById();
  }

  onFileSelectedFile(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
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

  getProductById(){
    this.sv.getProductById(this.productId).subscribe((res)=>{
      this.productForm.patchValue(res);
      console.log(res);
      this.existingImage = 'data:image/jpeg;base64,'+ res.byteImg;
    })
  }

  updateProduct():void{
    if(this.productForm.valid){
      const formData = new FormData();
      if(this.imgChanged && this.selectedFile){
        formData.append('img',this.selectedFile);

      }
      formData.append('categoryId',this.productForm.get('categoryId').value);
      formData.append('name',this.productForm.get('name').value);
      formData.append('description',this.productForm.get('description').value);
      formData.append('price',this.productForm.get('price').value);

      this.sv.updateProduct(this.productId,formData).subscribe((res)=>{
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
