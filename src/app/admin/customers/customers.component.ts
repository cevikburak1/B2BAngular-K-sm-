import { Component, NgModule, OnInit } from '@angular/core';
import { CustomersModule } from './customers.module';
import { CustomerService } from './service/customer.service';
import { CustomerModel } from './model/customer.model';
import { ErrorService } from 'src/app/service/error.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/service/helper.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})


export class CustomersComponent implements OnInit {

  customers:CustomerModel[]=[];
  customer:CustomerModel = new CustomerModel();

  filterText:string = "";
  constructor(
    private customerService:CustomerService,
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
    let title = "Müşteri Listesi Exceli"
    this.helperService.exportExcel(element,title)
  }

  getCustomer(customer: CustomerModel){
    this.customerService.getById(customer.id).subscribe((res:any)=>{
  this.customer=res.data
     },(err)=>{
      this.errorService.errorHandler(err)
    })
  }
  
    getList(){
      this.customerService.getList().subscribe((res:any)=>{
        
        this.customers= res.data;
        console.log(this.customers);
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
