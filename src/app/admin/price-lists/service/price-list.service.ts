import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PriceListModule } from '../model/price-list-model';


@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { 

  }
  getList(){
    
    let api = this.apiUrl+"PriceLists/GetList";
    return this.httpClient.get(api);
  }

  getById(id:number){
    let api = this.apiUrl+"PriceLists/GetById/" + id;
    return this.httpClient.get(api);
  }

  delete(priceList:PriceListModule){
    let api = this.apiUrl+"PriceLists/Delete";
    return this.httpClient.post(api,priceList);
  }

  add(priceList:PriceListModule){
    let api = this.apiUrl+"PriceLists/Add";
    return this.httpClient.post(api,priceList);
  }

  update(priceList:PriceListModule){
    let api = this.apiUrl+"PriceLists/Update";
    return this.httpClient.post(api,priceList);
  }
}
