import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from 'src/app/service/storage/user-storage.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.scss']
})
export class ViewProductDetailsComponent implements OnInit {


  productId:number = this.active.snapshot.params["productId"];

  product:any;
  FAQS:any[]=[];
  reviews:any[]=[];
  constructor(private sv:CustomerService,private snack: MatSnackBar,private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductDetailsById();
  }

  getProductDetailsById(){
    this.sv.getProductDetailsById(this.productId).subscribe((res)=>{
      this.product =res.productDto;
      this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;

      this.FAQS= res.faqDtoList;

      res.reviewDtoList.forEach(element => {
        element.processedImg ='data:image/png;base64,'+element.returnedImg;
        this.reviews.push(element);
      });
    })
  }

  addToWishList(){
    const wishListDto={
    productId:this.productId,
    userId:UserStorageService.getUserId()
    }

    this.sv.addProductToWishList(wishListDto).subscribe((res)=>{
      if(res.id !=null){
        console.log(res);
        this.snack.open("Success","Close",{duration:5000});
      }else{
        this.snack.open("Error","Close",{duration:5000});
      }
    })
  }

}
