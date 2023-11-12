import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { OrderPipe } from './pipe/order.pipe';
import { FormsModule } from '@angular/forms';

const routes:Routes = [{
  path:'',
  component:OrdersComponent
}]



@NgModule({
  declarations: [
    OrdersComponent,
    OrderPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports:[
    OrdersComponent
  ]
})
export class OrdersModule { }
