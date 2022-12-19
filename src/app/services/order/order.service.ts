import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderItem } from '../model/order-item.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order!: Order;
  orderItems: any = [];

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  postOrder(data: any) {
    return this.http.post<any>(this.url + 'Orders', data);
  }
  getOrder() {
    return this.http.get<any>(this.url + 'Orders?pageNumber=1&pageSize=20');
  }

  putOrder(data: any) {
    return this.http.put<any>(this.url + 'Orders', data);
  }

  delOrder(id: any) {
    return this.http.delete<any>(this.url + `Orders?id=${id}`);
  }
}
