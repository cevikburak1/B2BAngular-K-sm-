import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AdminLoginModel } from '../models/admin-login-model';
import { AdminTokenModel } from '../models/admin-token-model';

import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/service/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    adminTokenModel:AdminTokenModel =  new  AdminTokenModel();

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient,
    private toastr :ToastrService,
    private errorService :ErrorService,
    private router:Router
  ) { }

  isAuthenticate(){
    if(localStorage.getItem("adminToken")){
      return true;
    }
    else{
      return false;
    }
    
  }
  login(adminLoginModel: AdminLoginModel){
    
    let api =this.apiUrl + "Auth/UserLogin";
    this.httpClient.post(api,adminLoginModel).subscribe((res:any)=>{
      this.adminTokenModel=res.data
      localStorage.setItem("adminToken",this.adminTokenModel.adminAccessToken);
      this.router.navigate(["/admin"])
      this.toastr.success("Giriş Başaralı Proje Admin Paneline Hoş Geldiniz")
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
  logout(){
    localStorage.removeItem("adminToken");
    this.router.navigate(["/admin-login"]);
    this.toastr.info("Admin Panelinden Çıkış Yaptınız")
  }

}
