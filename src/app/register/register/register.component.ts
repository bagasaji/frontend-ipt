import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

import { ToastService } from '../../api/toast.service';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastService) { }

  ngOnInit(): void {
    document.body.className = 'hold-transition register-page';
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });

    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }

  signup(): void {
    const signup = this.authService
    .signup(this.signupForm.value)
    .subscribe();
  }

}
