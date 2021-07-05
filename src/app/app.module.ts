import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ForgotpasswordModule } from './forgotpassword/forgotpassword.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ServicesModule } from './services/services.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService} from "./api/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    DashboardModule,
    ForgotpasswordModule,
    ServicesModule,
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
