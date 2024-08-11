import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/service/storage/user-storage.service';


const BASIC = "http://localhost:8080/"
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }


  getAllProduct():Observable<any>{
    return this.http.get(BASIC + 'api/customer/products',{headers:this.createAuthorizationHeader()});
  }

  searchByName(name:any):Observable<any>{
    return this.http.get(BASIC + `api/customer/search/${name}`,{headers:this.createAuthorizationHeader()});
  }
  addToCart(productId: any): Observable<any> {
    // Kiểm tra productId
    if (!productId) {
      throw new Error("productId must be provided");
    }
  
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };
  
    return this.http.post(BASIC + "api/customer/cart", cartDto, { headers: this.createAuthorizationHeader() });
  }

  applyCoupon(code:any):Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC + `api/customer/coupon/${userId}/${code}`,{headers:this.createAuthorizationHeader()});
  }
  

  getCartByUserId():Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC + `api/customer/cart/${userId}`,{headers:this.createAuthorizationHeader()});
  }

  increaseProduct(productId:any):Observable<any>{
    const cartDto ={
      productId : productId,
      userId:UserStorageService.getUserId()
    }

    return this.http.post(BASIC + `api/customer/addition`,cartDto,{headers:this.createAuthorizationHeader()});
  }

  decreaseProduct(productId:any):Observable<any>{
    const cartDto={
      productId:productId,
      userId:UserStorageService.getUserId()
    }
    return this.http.post(BASIC + `api/customer/deduction`,cartDto,{headers:this.createAuthorizationHeader()});
    }

    placeOrder(orderDto:any):Observable<any>{
      orderDto.userId = UserStorageService.getUserId()
      return this.http.post(BASIC + 'api/customer/placeOrder',orderDto,{headers:this.createAuthorizationHeader()});
    }

    getOrderByUserId(){
      const userId = UserStorageService.getUserId()
      return this.http.get(BASIC + `api/customer/myOrders/${userId}`,{headers:this.createAuthorizationHeader()});
    }

    getOrderedProductDetails(orderId:number):Observable<any>{
      return this.http.get(BASIC + `api/customer/ordered-products/${orderId}`,{headers:this.createAuthorizationHeader()});
    }

    giveReview(reviewDto:any):Observable<any>{
      return this.http.post(BASIC + `api/customer/review`,reviewDto,{headers:this.createAuthorizationHeader()});
    }

    getProductDetailsById(productId:any):Observable<any>{
      return this.http.get(BASIC + `api/customer/getProductById/${productId}`,{headers:this.createAuthorizationHeader()});
    }

    addProductToWishList(wishListDto:any):Observable<any>{ 
      return this.http.post(BASIC + 'api/customer/wishList',wishListDto,{headers:this.createAuthorizationHeader()});
    }

    getWishListByUserId():Observable<any>{
      const userId=UserStorageService.getUserId()
      return this.http.get(BASIC + `api/customer/wishLists/${userId}`,{headers:this.createAuthorizationHeader()});
    }


  


  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer ' +UserStorageService.getToken()
    )
  }
}
