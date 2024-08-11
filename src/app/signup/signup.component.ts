import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { UserStorageService } from '../service/storage/user-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  signupForm!:FormGroup;
  // loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private snack:MatSnackBar,private auth:AuthService,private route:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      name:[null,[Validators.required]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    })
    // this.loginForm =this.fb.group({
    //   email:[null,[Validators.required,Validators.email]],
    //   password:[null,[Validators.required]]
    // })
  }

  onSubmit(){
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      this.snack.open("not match","Close",{duration:5000});
      return;
    }

    this.auth.register(this.signupForm.value).subscribe((res)=>{
      this.snack.open("Success","Close",{duration:5000});
      this.route.navigateByUrl("/login");
    },error=>{
      this.snack.open("Failed","Close",{duration:5000,panelClass:'error-snackbar'});
    })

  }
  



}
