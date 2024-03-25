import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
// shop by category in navbar
  getShopCategory(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/category/all');
  }
  //get all product
  getAllProduct(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/product/product');
  }

  //get ID based  Featured product
  getOneProductFromFeature(id: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/product/fetchlbycategory?categoryId='+id);
  }
   //get Best seller product
   getBestSellerProduct(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/product/product');
  }
   //get Top rated product
   getTopRatedProduct(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/product/topratedproduct');
  }
   //get special offer product
   getSpecialOfferProduct(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/product/specialoffer');
  }

  

  
}

// product/product