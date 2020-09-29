import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { User } from '../Models/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // todo: property binding on ths object
  user: User = new User();
  // todo: 2 way binding on this variable.
  private displayError: string = '';

  constructor(private _injector: Injector, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    const authService = this._injector.get(AuthService);
    authService.loginUser(this.user);
  }

}
