import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuyOrder } from '../model/buyorder.model';


@Injectable({
  providedIn: 'root'
})
export class BuyorderService {

  buyorder!: BuyOrder;
  buyorderItems: any = [];

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  getBuyOrder() {
    return this.http.get<any>(this.url + 'BuyOrders?pageNumber=1&pageSize=200');
  }

  getBuyOrdersbyId(id: any) {
    return this.http.get<any>(this.url + `BuyOrders/${id}`);
  }

  postBuyOrder(data: any) {
    return this.http.post<any>(this.url + 'BuyOrders', data);
  }

  putBuyOrder(data: any) {
    return this.http.put<any>(this.url + 'BuyOrders', data);
  }

  delBuyOrder(id: any) {
    return this.http.delete<any>(this.url + `BuyOrders?id=${id}`);
  }
}
