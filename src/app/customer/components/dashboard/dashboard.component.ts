import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
products : any[]=[];
searchForm!:FormGroup;

  constructor(private sv:CustomerService,private snack:MatSnackBar,private fb:FormBuilder) { }

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
    this.sv.searchByName(title).subscribe((res)=>{
      console.log(res);
      res.forEach(element=>{
        element.processedImg= 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      })
    })
  }

  addToCart(id:any){
    this.sv.addToCart(id).subscribe((res)=>{
      console.log(id);
      this.snack.open("Success","Close",{duration:5000});
    })
  }

  

}
