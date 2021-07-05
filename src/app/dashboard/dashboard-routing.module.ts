import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceInquiryComponent } from '../services/balance-inquiry/balance-inquiry.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService } from "../api/auth-guard.service";
import { HomeComponent } from '../services/home/home.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'balance-inquiry', component: BalanceInquiryComponent },
      { path: 'home', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
