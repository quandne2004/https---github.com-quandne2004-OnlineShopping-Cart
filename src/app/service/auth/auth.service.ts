import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';


const BASIC = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private str:UserStorageService) { }

  register(signupRequest:any):Observable<any>{
    return this.http.post(BASIC + 'api/auth/sign-up',signupRequest);
  }

  login(username:string,password:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-type','application/json');
    const body = {username,password};

    return this.http.post(BASIC + 'api/auth/authenticate',body,{headers,observe:'response'}).pipe(
      map((res)=>{
        const token = res.headers.get('authorization').substring(7);
        const user = res.body;
        if(token && user){
          this.str.saveToken(token);
          this.str.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }

  getOrderByTrackingId(trackingId:number):Observable<any>{
    return this.http.get(BASIC + `order/${trackingId}`);
  }
}
