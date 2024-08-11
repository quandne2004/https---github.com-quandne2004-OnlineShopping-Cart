import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { UserStorageService } from '../service/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private snack:MatSnackBar,private route:Router,private sv:AuthService) { }

  ngOnInit(): void {
    this.loginForm =this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
  }

  onSubmit():void{
    const username = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.sv.login(username,password).subscribe((res)=>{
      this.snack.open("login success","Close",{duration:5000});
      if(UserStorageService.isAdminLoggedIn()){
        this.route.navigateByUrl('/admin/dashboard');
      }else if(UserStorageService.isCustomerLoggedIn()){
        this.route.navigateByUrl('/customer/dashboard');
      }
    },error=>{
      this.snack.open("Failed","Close",{duration:5000});
    })
  }

}
