import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  // getOrderDetail() {
  //   return this.http.get<any>(this.url + 'OrderDetail?pageNumber=1&pageSize=20');
  // }

  // getOrderDetailbyId(id: any) {
  //   return this.http.get<any>(this.url + `OrderDetail/${id}`);
  // }

  // postOrderDetail(data: any) {
  //   return this.http.post<any>(this.url + 'OrderDetail', data);
  // }

  // putOrderDetail(data: any) {
  //   return this.http.put<any>(this.url + 'OrderDetail', data);
  // }

  delOrderDetail(id: any) {
    return this.http.delete<any>(this.url + `OrderDetail?id=${id}`);
  }
}
