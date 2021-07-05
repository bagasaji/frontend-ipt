import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { SaldoService } from "../../api/saldo.service";
import { AuthService } from "../../api/auth.service";

import { User } from '../../models/User';
import { Saldo } from '../../models/Saldo';
import { Header } from '../../models/Header';

@Component({
  selector: 'app-balance-inquiry',
  templateUrl: './balance-inquiry.component.html',
  styleUrls: ['./balance-inquiry.component.css']
})
export class BalanceInquiryComponent implements OnInit {
  saldo$: Observable<Saldo[]>;
  userId: Pick<User, "id">;
  signatureAuth$: Observable<{
    signatureAuth: string;
    accessToken: string;
    signatureService: string;
  }>;
  // signatureAuth: string;
  // accessToken: string;
  // signatureService: string;

  constructor(private saldoService: SaldoService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.postSignatureAuth();
    // this.signatureAuth = this.saldoService.signatureAuth;
    this.signatureAuth$ = this.postSignatureAuth();
    console.log("signatureAuth: " + this.signatureAuth$);
    //this.postAccessToken
    //this.postSignatureService
    this.userId = this.authService.userId;
    this.saldo$ = this.postSaldo();
    console.log("id: " + this.userId);
    console.log("saldo: " + this.saldo$);
  }

  postSignatureAuth(): Observable<{
    signatureAuth: string;
    accessToken: string;
    signatureService: string;
  }> {
    return this.saldoService.postSignatureAuth();
  }

  postSaldo(): Observable<Saldo[]> {
    return this.saldoService.postSaldo(this.userId);
  }
}
