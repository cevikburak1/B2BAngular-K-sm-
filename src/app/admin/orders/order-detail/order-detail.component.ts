import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from './service/order-detail.service';
import { OrderDetailModel } from './model/order-detail-model';
import { ErrorService } from 'src/app/service/error.service';
import { OrderService } from '../service/order.service';
import { OrderModel } from '../model/order-model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit{

  orderDetails:OrderDetailModel[] = [];
  order:OrderModel = new OrderModel();

  orderId:number = 0;
  constructor(
    private activatedRoute:ActivatedRoute,
    private orderDetailService:OrderDetailService,
    private errorService:ErrorService,
    private orderService:OrderService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.orderId = res.id;
      this.getList();
      this.getOrder();
    })
  }
  getList(){
    this.orderDetailService.getList(this.orderId).subscribe((res:any)=>{
      this.orderDetails = res.data
    },(err)=>{
      this.errorService.errorHandler(err)
    })
  }

  getOrder(){
    this.orderService.getById(this.orderId).subscribe((res:any)=>{
      
      this.order= res.data
    },(err)=>{
      this.errorService.errorHandler(err)
    })
  }
}
