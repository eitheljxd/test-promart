import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../../models/product.model';
import { Usuario } from './../../models/usuario.model';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Usuario[]>(`${environment.url_api}/usuarios.json`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/usuarios.json/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/usuarios.json`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/usuarios.json/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/usuarios/${id}`);
  }
}
