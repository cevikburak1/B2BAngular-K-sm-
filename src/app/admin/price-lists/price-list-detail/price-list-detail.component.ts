import { Component, OnInit} from '@angular/core';
import { ErrorService} from 'src/app/service/error.service';
import { ToastrService} from 'ngx-toastr';
import { HelperService} from 'src/app/service/helper.service';
import { NgForm} from '@angular/forms';

import { PriceListDetailService} from './service/price-list-detail.service';
import { PriceListDetailModel} from './model/price-list-model';
import { ActivatedRoute} from '@angular/router';
import { ProductService } from '../../products/service/product.service';
import { ProductModule } from '../../products/model/product-model';

@Component({
  selector: 'app-price-list-detail',
  templateUrl: './price-list-detail.component.html',
  styleUrls: ['./price-list-detail.component.css']
})
export class PriceListDetailsComponent implements OnInit {

  products:ProductModule[]=[];
  priceListDetails:PriceListDetailModel[]=[];
  priceListDetail:PriceListDetailModel = new PriceListDetailModel();

  filterText:string = "";
  priceListId:number = 0;
  constructor(
    private priceListDetailService:PriceListDetailService,
    private errorService:ErrorService,
    private toastrService:ToastrService,
    private helperService : HelperService,
    private activatedRoute:ActivatedRoute,
    private productService :ProductService
  ){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.priceListId  = res.id;  
      this.getList(); 
      this.getProductList();
    })
   
  }
  exportExcel(){
    let element = document.getElementById("excel-table");
    let title = "Fiyat Listesi Exceli"
    this.helperService.exportExcel(element,title)
  }

  getPriceListDetail(priceListDetail: PriceListDetailModel){
    debugger
    this.priceListDetailService.getById(priceListDetail.id).subscribe((res:any)=>{
  this.priceListDetail=res.data
     },(err)=>{
      this.errorService.errorHandler(err)
    })
  }
  
    getList(){
      this.priceListDetailService.getList(  this.priceListId ).subscribe((res:any)=>{
        
        this.priceListDetails= res.data;
      
        console.log(this.priceListDetails);
      },(err)=>{
        this.errorService.errorHandler(err);
      })
    }

    getProductList(){
      this.productService.getList().subscribe((res:any)=>{
        this.products = res.data;
        
      },(err)=>{
        this.errorService.errorHandler(err);
      });
    }
  
    delete(priceListDetail:PriceListDetailModel){
      this.priceListDetailService.delete(priceListDetail).subscribe((res:any)=>{
        this.toastrService.info(res.message)
        this.getList();
      },(err)=>{
        this.errorService.errorHandler(err)
      })
    }
  
  
  
    update(priceListDetail:PriceListDetailModel){
      this.priceListDetailService.update(priceListDetail).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      this.getList();
      document.getElementById("updateModelCloseBtn").click();
     },(err)=>{
      this.errorService.errorHandler(err)
    })
    }
  
    add(addForm:NgForm)
    {
      
      let priceListDetail : PriceListDetailModel = new PriceListDetailModel();
      priceListDetail.productId = addForm.value.prodcutId;
      priceListDetail.price = addForm.value.price;
      priceListDetail.priceListId = this.priceListId;
      priceListDetail.id=0;
      this.priceListDetailService.add(priceListDetail).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      this.getList();
      addForm.reset();
     },(err)=>{
      this.errorService.errorHandler(err)
    }) 
  }
}
