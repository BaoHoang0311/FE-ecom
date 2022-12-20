import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BuyorderService {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  getBuyOrders() {
    return this.http.get<any>(this.url + 'BuyOrders?pageNumber=1&pageSize=20');
  }

  getBuyOrdersbyId(id: any) {
    return this.http.get<any>(this.url + `BuyOrders/${id}`);
  }

  postBuyOrders(data: any) {
    return this.http.post<any>(this.url + 'BuyOrders', data);
  }

  putBuyOrders(data: any) {
    return this.http.put<any>(this.url + 'BuyOrders', data);
  }

  delBuyOrders(id: any) {
    return this.http.delete<any>(this.url + `BuyOrders?id=${id}`);
  }
}
