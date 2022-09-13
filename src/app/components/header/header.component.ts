import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dropDown: boolean = false;
  loggedIn: boolean;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
    if (localStorage.getItem('MKPG')) {
      this.loggedIn = true;
    }else {
      this.loggedIn = false;
    }
  }

  ngOnInit(): void {
    this.customerService.userId$.subscribe( userId => {
      if(userId) {
        this.loggedIn = true;
      }else {
        this.loggedIn = false;
      }
    })
  }

  onMouseEnter(){
    this.dropDown = true;
  }

  onMouseleave(){
    this.dropDown = false;
  }

  onClickLogin(){
    this.router.navigate(['/login']);
  }

  onClickRegister(){
    this.router.navigate(['/register']);
  }

  onClickProfile(){
    this.router.navigate(['/profile']);
  }

  onClickLogOut() {
    this.customerService.logout();
  }
}
