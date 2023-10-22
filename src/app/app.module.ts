import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { Toast, ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthInterceptor } from './admin/login/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    BrowserModule,
    ToastrModule.forRoot({
      closeButton:true,
      progressBar:true
    }),
    SweetAlert2Module.forChild({})
   
  ],
  providers: [
    {
      provide:'apiUrl',
      useValue:'https://localhost:7146/api/'
    },
    {
      provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
