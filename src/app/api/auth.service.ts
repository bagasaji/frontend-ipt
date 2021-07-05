import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User'
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

import { ToastService } from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">;
  name: Pick<User, "name">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private toastr: ToastService
  ) { }

  signup(user: Omit<User, "id">): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        tap(() => {
          this.toastr.successToast("Register success!");
          this.router.navigate(['login']);
        }),
        catchError(this.errorHandlerService.handleError<User>("Signup"))
      )
  }

  login(
    email: Pick<User, "email">,
    password: Pick<User, "password">
  ): Observable<{
    token: string;
    userId: Pick<User, "id">;
    name: Pick<User, "name">;
  }> {
    return this.http
      .post<any>(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, "id">; name: Pick<User, "name">; }) => {
          this.toastr.successToast("Login success!");
          this.userId = tokenObject.userId;
          this.name = tokenObject.name;
          localStorage.setItem("token", tokenObject.token);
          console.log("Token generated!");
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["dashboard/home"]);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, "id">;
            name: Pick<User, "name">;
          }>("Login")
        )
      );
  }
}
