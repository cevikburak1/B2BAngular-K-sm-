import { Component, OnInit } from '@angular/core';
import { OrderModel } from './model/order-model';
import { OrderService } from './service/order.service';
import { ErrorService } from 'src/app/service/error.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/service/helper.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

 orders:OrderModel[]=[];
  order:OrderModel = new OrderModel();

  filterText:string = "";
  statusText:string = "Tümü";
  constructor(
    private orderService:OrderService,
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
    let title = "Sipariş Exceli"
    this.helperService.exportExcel(element,title)
  }

  getPriceList(order: OrderModel){
    this.orderService.getById(order.id).subscribe((res:any)=>{
  this.order=res.data
     },(err)=>{
      this.errorService.errorHandler(err)
    })
  }
  
    getList(){
      this.orderService.getList().subscribe((res:any)=>{
        
        this.orders= res.data;
        console.log(this.orders);
      },(err)=>{
        this.errorService.errorHandler(err);
      })
    }
  
 
  
  
  
    update(order :OrderModel,status:string){
      order.status=status;
      this.orderService.update(order).subscribe((res:any)=>{
      this.toastrService.info(res.message);
      this.getList();
     },(err)=>{
      this.errorService.errorHandler(err)
    })
    }
  
  }

