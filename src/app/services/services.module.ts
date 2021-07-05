import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { BalanceInquiryComponent } from './balance-inquiry/balance-inquiry.component';
import { HomeComponent } from './home/home.component';

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService} from "../api/auth-interceptor.service";

@NgModule({
  declarations: [
    BalanceInquiryComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptorService,
  //     multi: true
  //   }
  // ],
})
export class ServicesModule { }
