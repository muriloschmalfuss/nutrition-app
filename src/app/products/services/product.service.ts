import { Injectable } from '@angular/core';
import { Product } from "../models/product";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private serverUrl = 'http://localhost:3000/products'

  constructor(private http: HttpClient) {

  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.serverUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.serverUrl}/${id}`)
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.serverUrl, product);
  }

  editProduct(id: number, product: Product) {
    return this.http.put<Product>(`${this.serverUrl}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<void>(`${this.serverUrl}/${id}`);
  }
}
