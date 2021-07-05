import { Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';

import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastr: ToastService
  ) { }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      if (`${operation}` == "Login") {
        this.toastr.errorToast(`${operation} failed: email or password wrong!`);
      }
      else if (`${operation}` == "Signup") {
        this.toastr.errorToast(`${operation} failed: email already registered!`);
      } else {
        this.toastr.errorToast(`${operation} failed: ${error.message}`);
      }
      return of(result as T);
    }
  }
}
