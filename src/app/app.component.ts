import { Component } from '@angular/core';
import { UserStorageService } from './service/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnlineShoppingCartManagement';

  isCustomerLoggedIn:boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean = UserStorageService.isAdminLoggedIn();

  constructor(private route:Router){}

  ngOnInit():void{
    this.route.events.subscribe(event=>{
      this.isAdminLoggedIn =UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
    })
  }

  logOut(){
    UserStorageService.signOut();
    this.route.navigateByUrl('/login');
  }
}
