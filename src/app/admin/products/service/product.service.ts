import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductModule } from '../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { 

  }
  getList(){
    let api = this.apiUrl+"Products/GetList";
    return this.httpClient.get(api);
  }

  getById(productId:number){
    let api = this.apiUrl+"Products/GetById/" + productId;
    return this.httpClient.get(api);
  }

  delete(product:ProductModule){
    let api = this.apiUrl+"Products/Delete";
    return this.httpClient.post(api,product);
  }

  add(product:ProductModule){
    let api = this.apiUrl+"Products/Add";
    return this.httpClient.post(api,product);
  }

  update(product:ProductModule){
    let api = this.apiUrl+"Products/Update";
    return this.httpClient.post(api,product);
  }
}
