import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyorderdetailService {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  delBuyOrderDetail(id: any) {
    return this.http.delete<any>(this.url + `BuyOrderDetail?id=${id}`);
  }
}
