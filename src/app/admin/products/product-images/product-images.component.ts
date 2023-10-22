import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ProductImagesService } from './service/product-images.service';
import { ActivatedRoute } from '@angular/router';
import { ProductImageModel } from './model/product-images-modul';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit{

  fileImages:any[] = [];
  productImages:ProductImageModel[] = []
  productId:number = 0;

  constructor(
    private productImageService:ProductImagesService,
    private activatedRoute:ActivatedRoute,
    private errorService:ErrorService 
  ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.productId = res.id;
      this.getList();
    })
  }

getList(){
  
  this.productImageService.getList(this.productId).subscribe((res:any)=>{
    
    this.productImages = res.data
    console.log(this.productImages);
  },(err)=>{
      this.errorService.errorHandler(err);
  })
}



setMainImage(id:number){
  
  this.productImageService.setMainImage(id).subscribe((res:any)=>{
    
    this.getList();
    console.log(this.productImages);
  },(err)=>{
      this.errorService.errorHandler(err);
  })
}


  uploadImages(){
    
    let formData = new FormData();
    formData.append("productId",this.productId.toString());
    for(let i = 0; i < this.fileImages.length; i++){
      
     formData.append("images", this.fileImages[i],this.fileImages[i].fileName);
     
    }
    this.productImageService.add(formData).subscribe((res:any)=>{
      this.getList()
    },(err)=>{
        this.errorService.errorHandler(err);
    })

  }
  deleteImage(productImage:ProductImageModel){
     this.productImageService.delete(productImage).subscribe((res:any)=>{
      this.getList();
     },(err)=>{
      this.errorService.errorHandler(err);
  })
  }



  getImages(event :any){
    this.fileImages = event.target.files;
  }
}
