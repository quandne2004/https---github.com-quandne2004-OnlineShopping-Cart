import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.scss']
})
export class ViewOrderedProductsComponent implements OnInit {


  orderId:any=this.active.snapshot.params["orderId"];
  orderedProductDetailsList= [];
  totalAmount:any;
  constructor(private route:Router,private sv:CustomerService,private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrderedProductDetailsList();
  }

  getOrderedProductDetailsList(){
    this.sv.getOrderedProductDetails(this.orderId).subscribe((res)=>{
      res.productDtoList.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.orderedProductDetailsList.push(element);
      });
      this.totalAmount = res.orderAmount;
    })
  }

}
