import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
products:any[]=[];
searchForm!:FormGroup;
  constructor(private sv:AdminService,private fb:FormBuilder,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.searchForm = this.fb.group({
      title:[null,[Validators.required]]
    })
  }

  getAllProducts(){
    this.products = [];
    this.sv.getAllProduct().subscribe((res)=>{
      console.log(res);
      res.forEach(element=>{
        element.processedImg= 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
    })
  }

  submitForm(){
    this.products = [];
    const title = this.searchForm.get('title').value;
    this.sv.getAllProductByName(title).subscribe((res)=>{
      console.log(res);
      res.forEach(element=>{
        element.processedImg= 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
    })
  }

  deleteProduct(productId:any){
    this.sv.deleteProduct(productId).subscribe((res)=>{
      if(res.body ==null){
        this.snack.open("Success","Close",{duration:5000});
        this.getAllProducts();
      }else{
        this.snack.open("Failed","Close",{duration:5000,panelClass:'error-snackbar'});
      }
    })
  }

}
