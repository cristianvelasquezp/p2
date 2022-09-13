import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  active = 'profile';
  customer: Customer;
  passwordForm: boolean = false;
  passwordNoValid: boolean = false;
  addressForm: boolean = false;

  form = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  })

  constructor(
    private customerService: CustomerService
  ) {
    this.customer = this.customerService.customer;
  }

  ngOnInit(): void {
    const customerId = localStorage.getItem('MKPG');
    if (customerId) {
      this.customerService.getCustomerById(customerId)
        .subscribe(data => {
          this.customer = data;
        })
    }
  }

  onClickItem(active: String) {
    if(active === 'profile') {
      this.passwordForm = false;
      this.addressForm = false;
    }

    this.active = `${active}`;
  }

  changePassword() {
    this.passwordForm = true;
  }

  addAddressForm() {
    this.addressForm = true;
  }

  save() {
    if (this.form.valid && this.form.get('oldPassword')?.value === this.customer.password) {
      const customer: Customer = {
        customerId: this.customer.customerId,
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email,
        password: `${this.form.get('newPassword')?.value}`,
        phone: this.customer.phone,
        birthDate: this.customer.birthDate,
        created: this.customer.created,
      }
      this.customerService.updateCustomer(customer)
        .subscribe(data => {
          this.customer.password = data.password;
        })

    } else if(this.form.get('oldPassword')?.value !== this.customer.password){
      this.passwordNoValid = true;
    }else {
      this.form.markAllAsTouched();
    }
  }

}
