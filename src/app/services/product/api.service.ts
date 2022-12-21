import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44381/api/';

  postProduct(data: any) {
    return this.http.post<any>(this.url + 'Products', data);
  }
  //https://localhost:44381/api/Products?pageNumber=1&pageSize=100
  getProduct() {
    return this.http.get<any>(this.url + 'Products?pageNumber=1&pageSize=200');
  }

  putProduct(data: any) {
    return this.http.put<any>(this.url + 'Products', data);
  }

  delProduct(id: any) {
    return this.http.delete<any>(this.url + `Products?id=${id}`);
  }
}
