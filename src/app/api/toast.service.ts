import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  successToast(msg: string){
    this.toastr.success(msg, "", {
      timeOut: 2000,
      tapToDismiss: true,
      positionClass: 'toast-top-center'
    });
  }

  errorToast(msg: string){
    this.toastr.error(msg, "", {
      timeOut: 2000,
      tapToDismiss: true,
      positionClass: 'toast-top-center'
    });
  }
}
