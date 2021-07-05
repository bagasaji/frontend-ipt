import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { User } from 'src/app/models/User';
import {ToastService} from "../../api/toast.service";

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {
  isAuthenticated = false;
  userId: Pick<User, "id">;
  name: Pick<User, "name">;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastService) { }

  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.name = this.authService.name;
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    })
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
    this.toastr.successToast("Logout success!");
  }

}
