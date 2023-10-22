import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListDetailsComponent } from './price-list-detail.component';
import { PriceListDetailPipe } from './pipe/price-list-detail.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {  RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:PriceListDetailsComponent
  }
]

@NgModule({
  declarations: [
    PriceListDetailsComponent,
    PriceListDetailPipe
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports:[
    PriceListDetailsComponent
  ]
})
export class PriceListDetailModule { }
