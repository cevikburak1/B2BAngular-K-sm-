import { Component, OnInit } from '@angular/core';
import { PriceListModule } from './model/price-list-model';
import { PriceListService } from './service/price-list.service';
import { ErrorService } from 'src/app/service/error.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/service/helper.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.css']
})
export class PriceListsComponent implements OnInit {

  priceLists:PriceListModule[]=[];
  priceList:PriceListModule = new PriceListModule();

  filterText:string = "";
  constructor(
    private priceListService:PriceListService,
    private errorService:ErrorService,
    private toastrService:ToastrService,
    private helperService : HelperService,
  ){

  }
  ngOnInit(): void {
    this.getList(); 
  }
  exportExcel(){
    let element = document.getElementById("excel-table");
    let title = "Fiyat Listesi Exceli"
    this.helperService.exportExcel(element,title)
  }

  getPriceList(priceList: PriceListModule){
    this.priceListService.getById(priceList.id).subscribe((res:any)=>{
  this.priceList=res.data
     },(err)=>{
      this.errorService.errorHandler(err)
    })
  }
  
    getList(){
      this.priceListService.getList().subscribe((res:any)=>{
        
        this.priceLists= res.data;
        console.log(this.priceLists);
      },(err)=>{
        this.errorService.errorHandler(err);
      })
    }
  
    delete(priceList:PriceListModule){
      this.priceListService.delete(priceList).subscribe((res:any)=>{
        this.toastrService.info(res.message)
        this.getList();
      },(err)=>{
        this.errorService.errorHandler(err)
      })
    }
  
  
  
    update(){
      this.priceListService.update(this.priceList).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      this.getList();
      document.getElementById("updateModelCloseBtn").click();
     },(err)=>{
      this.errorService.errorHandler(err)
    })
    }
  
    add(addForm:NgForm)
    {
     let  priceListModel : PriceListModule = new PriceListModule();
     priceListModel.name = addForm.value.priceListName;
     priceListModel.id = 0;
  
      this.priceListService.add(priceListModel).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      this.getList();
      addForm.reset();
     },(err)=>{
      this.errorService.errorHandler(err)
    })
  }
}
