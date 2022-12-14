import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  delOrderDetail(id: any) {
    return this.http.delete<any>(this.url + `OrderDetail?id=${id}`);
  }
}
