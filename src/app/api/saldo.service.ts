import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User';
import { Saldo } from '../models/Saldo';
import { Header } from '../models/Header';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  private url = "http://localhost:8080/bi/openapi/balance-inquiry";
  private urlSignatureAuth = "http://localhost:5000/bi/openapi/auth-header";

  signatureAuth: string;
  accessToken: string;
  signatureService: string;

  httpAuth: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  httpToken: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "X-Signature": ""
    })
  }

  httpService: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "",
      "Authorization-Customer": "",
      "X-TIMESTAMP": "",
      "X-SIGNATURE": ""
    })
  }

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  postSignatureAuth(): Observable<{
    signatureAuth: string;
    accessToken: string;
    signatureService: string;
  }> {
    return this.http
      .post<{
        signatureAuth: string;
        accessToken: string;
        signatureService: string;
      }>(this.urlSignatureAuth, {}, this.httpAuth)
      .pipe(
        first(),
        tap((tokenObject: { signatureAuth: string; accessToken: string; signatureService: string; }) => {
          this.signatureAuth = tokenObject.signatureAuth;
          this.accessToken = tokenObject.accessToken;
          this.signatureService = tokenObject.signatureService;
          localStorage.setItem("signatureAuth", tokenObject.signatureAuth);
          localStorage.setItem("accessToken", tokenObject.accessToken);
          localStorage.setItem("signatureService", tokenObject.signatureService);
          console.log("Signature and Access Token generated!");
        }),
        catchError(
          this.errorHandlerService.handleError<{
            signatureAuth: string;
            accessToken: string;
            signatureService: string;
          }>("postSignatureAuth")
        )
      );
  }

  postSaldo(userId: Pick<User, "id">): Observable<Saldo[]> {
    return this.http
      .post<Saldo[]>(`${this.url}/${userId}`, { responseType: "json" },)
      .pipe(
        catchError(this.errorHandlerService.handleError<Saldo[]>("postSaldo", []))
      );
  }

  //getAccessToken
  //getSignatureService
}
