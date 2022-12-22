import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) { }

  url = 'https://localhost:44381/api/';



  //https://localhost:44381/api/Products?pageNumber=1&pageSize=100
  getAllCustomerPaging(sortBy: any, pageNumber: any, pageSize: number) {
    return this.http.get<any>(this.url + `Customers?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`);
  }

  // getAllCustomer() {
  //   return this.http.get<any>(this.url + `all-cus`);
  // }

  putCustomer(data: any) {
    return this.http.put<any>(this.url + 'Customers', data);
  }

  postCustomer(data: any) {
    return this.http.post<any>(this.url + 'Customers', data);
  }

  delCustomer(id: any) {
    return this.http.delete<any>(this.url + `Customers?id=${id}`);
  }

}
