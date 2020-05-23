import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { AbstractModule } from 'src/app/shared/abstract.module';
import { HttpInterceptorService } from './auth/interceptors/http/http-interceptor.service';
import { ErrorInterceptorService } from './auth/interceptors/error/error-interceptor.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    AbstractModule
  ],
  providers:[HttpInterceptorService, ErrorInterceptorService]
})
export class SecurityModule { }
