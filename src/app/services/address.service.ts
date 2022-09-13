import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createCustomerDTO, Customer} from "../models/customer.model";
import {Address, createAddressDTO} from "../models/address.model";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private _url: String = `http://localhost:8080/api/addresses`;

  constructor(
    private http: HttpClient
  ) { }

  getAddressById(id: String) {
    return this.http.get<Address>(`${this._url}/${id}`);
  }

  createAddress(address: createAddressDTO) {
    return this.http.post<Address>( `${this._url}`, address);
  }
}
