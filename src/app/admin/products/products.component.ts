import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { ErrorService } from 'src/app/service/error.service';
import { ProductModule } from './model/product-model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:ProductModule[]=[];
  product:ProductModule =  new ProductModule();
  filterText:string ="";


  constructor(
    private productService:ProductService,
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
  let title = "Ürünler Exceli"
  this.helperService.exportExcel(element,title)
}


  getList(){
    this.productService.getList().subscribe((res:any)=>{
      
      this.products= res.data;
      console.log("Ürünler"+this.products);
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  delete(product:ProductModule){
    this.productService.delete(product).subscribe((res:any)=>{
      this.toastrService.info(res.message)
      this.getList();
    },(err)=>{
      this.errorService.errorHandler(err)
    })
  }



  update(){
    this.productService.update(this.product).subscribe((res:any)=>{
    this.toastrService.success(res.message);
    this.getList();
    document.getElementById("updateModelCloseBtn").click();
   },(err)=>{
    this.errorService.errorHandler(err)
  })
  }

  add(addForm:NgForm)
  {
   let  product : ProductModule = new ProductModule();
   product.name = addForm.value.productName;
   product.id = 0;

    this.productService.add(product).subscribe((res:any)=>{
    this.toastrService.success(res.message);
    this.getList();
    addForm.reset();
   },(err)=>{
    this.errorService.errorHandler(err)
  })
}

getProduct(product: ProductModule){
  this.productService.getById(product.id).subscribe((res:any)=>{
this.product=res.data
   },(err)=>{
    this.errorService.errorHandler(err)
  })
}

 
}
