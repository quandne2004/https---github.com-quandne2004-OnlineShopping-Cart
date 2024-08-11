import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/service/storage/user-storage.service';


const BASIC = "http://localhost:8080/"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private userStr:UserStorageService) { }

  postCategory(categoryDto:any):Observable<any>{
    return this.http.post(BASIC + 'api/admin/category',categoryDto,{headers:this.createAuthorizationHeader()});
  }

  getAllCategory():Observable<any>{
    return this.http.get(BASIC + 'api/admin/Categories',{headers:this.createAuthorizationHeader()});
  }

  addProduct(productDto:any):Observable<any>{
    return this.http.post(BASIC + 'api/admin/product',productDto,{headers:this.createAuthorizationHeader()});
  }

  getAllProduct():Observable<any>{
    return this.http.get(BASIC +'api/admin/products',{headers:this.createAuthorizationHeader()});
  }

  getAllProductByName(name:any):Observable<any>{
    return this.http.get(BASIC +`api/admin/search/${name}`,{headers:this.createAuthorizationHeader()});
  }

  deleteProduct(productId:any):Observable<any>{
    return this.http.delete(BASIC + `api/admin/delete-product/${productId}`,{headers:this.createAuthorizationHeader()});
  }


  createCoupon(couponDto:any):Observable<any>{
    return this.http.post(BASIC + 'api/admin/coupons',couponDto,{headers:this.createAuthorizationHeader()});
  }

  getAllCoupon():Observable<any>{
    return this.http.get(BASIC + 'api/admin/allCoupons',{headers:this.createAuthorizationHeader()});
  }

  getPlacedOrder():Observable<any>{
    return this.http.get(BASIC + "api/admin/placeOrders",{headers:this.createAuthorizationHeader()});
  }

  changeOrderStatus(orderId:number,status:string):Observable<any>{
    return this.http.get(BASIC + `api/admin/order/${orderId}/${status}`,{headers:this.createAuthorizationHeader()});
  }

  postFAQ(productId:number,faqDto:any):Observable<any>{
    return this.http.post(BASIC + `api/admin/FAQ/${productId}`,faqDto,{headers:this.createAuthorizationHeader()});
  }

  getProductById(productId):Observable<any>{
    return this.http.get(BASIC + `api/admin/products/${productId}`,{headers:this.createAuthorizationHeader()});
  }

  updateProduct(productId:any,productDto:any):Observable<any>{
    return this.http.put(BASIC + `api/admin/product/${productId}`,productDto,{headers:this.createAuthorizationHeader()});
  }

  getAnalytics():Observable<any>{
    return this.http.get(BASIC +'api/admin/order/analytics',{headers:this.createAuthorizationHeader()});
  }




  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' +UserStorageService.getToken()
    )
  }
}
