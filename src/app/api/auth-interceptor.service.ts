import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    const xTimestamp = moment().format();
    console.log(req)
    if (token) {
      const clonedRequest = req.clone({
        // headers: req.headers.set("Authorization", "Bearer " + token)
        setHeaders: {
          "Authorization": "Bearer " + token,
          "Authorization-Customer": "Bearer " + token,
          "X-TIMESTAMP": xTimestamp,
          // "X-SIGNATURE": ""
        }
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }

  constructor() { }
}
