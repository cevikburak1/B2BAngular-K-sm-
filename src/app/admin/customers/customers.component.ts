import { Component, NgModule, OnInit } from '@angular/core';
import { CustomersModule } from './customers.module';
import { CustomerService } from './service/customer.service';
import { CustomerModel } from './model/customer.model';
import { ErrorService } from 'src/app/service/error.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/service/helper.service';
import { NgForm } from '@angular/forms';
import { PriceListService } from '../price-lists/service/price-list.service';
import { PriceListModule } from '../price-lists/model/price-list-model';
import { CustomerRelationshipModel } from './model/customer-relationship-model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})


export class CustomersComponent implements OnInit {

  customers:CustomerModel[]=[];
  priceLists: PriceListModule[]=[];
  customer:CustomerModel = new CustomerModel();

  filterText:string = "";
  constructor(
    private customerService:CustomerService,
    private errorService:ErrorService,
    private toastrService:ToastrService,
    private helperService : HelperService,
    private  priceListService :PriceListService
  ){

  }
  ngOnInit(): void {
    this.getList(); 
    this.getPriceList()
  }
  exportExcel(){
    let element = document.getElementById("excel-table");
    let title = "Müşteri Listesi Exceli"
    this.helperService.exportExcel(element,title)
  }

  getCustomer(customer: CustomerModel){
    
    this.customerService.getDtoById(customer.id).subscribe((res:any)=>{
      
  this.customer=res.data
  console.log(res.data);
     },(err)=>{
      this.errorService.errorHandler(err)
    })
  }
  
    getList(){
      this.customerService.getList().subscribe((res:any)=>{
        
        this.customers= res.data;
      
      },(err)=>{
        this.errorService.errorHandler(err);
      })
    }


    getPriceList(){
      this.priceListService.getList().subscribe((res:any)=>{
        
        this.priceLists= res.data;
        console.log(res.data);
      },(err)=>{
        this.errorService.errorHandler(err);
      })
    }
  
    delete(customer:CustomerModel){
      this.customerService.delete(customer).subscribe((res:any)=>{
        this.toastrService.info(res.message)
        this.getList();
      },(err)=>{
        this.errorService.errorHandler(err)
      })
    }
  
  
  
    update(){
      this.customerService.update(this.customer).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      this.getList();
      document.getElementById("updateModelCloseBtn").click();
     },(err)=>{
      this.errorService.errorHandler(err)
    })
    }

    updateRelationship(){
      
      let model:CustomerRelationshipModel = new CustomerRelationshipModel();
      model.customerid =this.customer.id;
      model.priceListId = this.customer.prticeListId;
      model.discount = this.customer.discount;
      this.customerService.updateRelationship(model).subscribe((res:any)=>{
      this.toastrService.info(res.message);
      this.getList();
      document.getElementById("updateRelationshipModelCloseBtn").click();
     },(err)=>{
      this.errorService.errorHandler(err)
    })
    }



  
    changePasswordByAdmin(password:any){
      let customer = new CustomerModel();
      customer.password = password.value;
      customer.id = this.customer.id;
      this.customerService.changePasswordByAdmin(customer).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      this.getList();
      document.getElementById("updatePasswordModelCloseBtn").click();
     },(err)=>{
      this.errorService.errorHandler(err)
    })
    }


    add(addForm:NgForm)
    {
     let  customerModel : CustomerModel = new CustomerModel();
     customerModel.name = addForm.value.name;
     customerModel.email = addForm.value.email;
     customerModel.password = addForm.value.password;
     customerModel.id = 0;
  
      this.customerService.add(customerModel).subscribe((res:any)=>{
      this.toastrService.success(res.message);
      this.getList();
      addForm.reset();
     },(err)=>{
      this.errorService.errorHandler(err)
    })
  }
}
