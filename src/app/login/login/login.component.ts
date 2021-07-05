import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    document.body.className = 'hold-transition login-page';
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });

    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }

  login(): void {
    this.authService
    .login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe()
  }

  register() {
    this.router.navigate(['register']);
  }

  forgotpassword() {
    this.router.navigate(['forgotpassword']);
  }

}
