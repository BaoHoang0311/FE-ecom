import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order!: Order;
  orderItems: any = [];

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  getOrder() {
    return this.http.get<any>(this.url + 'Orders?pageNumber=1&pageSize=200');
  }

  getOrderbyId(id: any) {
    return this.http.get<any>(this.url + `Orders/${id}`);
  }

  postOrder(data: any) {
    return this.http.post<any>(this.url + 'Orders', data);
  }

  putOrder(data: any) {
    return this.http.put<any>(this.url + 'Orders', data);
  }

  delOrder(id: any) {
    return this.http.delete<any>(this.url + `Orders?id=${id}`);
  }
}
