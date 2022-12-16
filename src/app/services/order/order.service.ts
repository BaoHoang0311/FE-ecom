import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  postOrder(data: any) {
    return this.http.post<any>(this.url + 'Orders', data);
  }
  //https://localhost:44381/api/Products?pageNumber=1&pageSize=100
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
