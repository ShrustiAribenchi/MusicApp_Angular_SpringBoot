import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Injector } from '@angular/core';
import { User } from '../Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private displayError: string = '';
  user: User = new User();

  // injecting here
  constructor(private _router: Router, private _injector: Injector) { }

  ngOnInit(): void {
  }

  registerUser() {
    const authService = this._injector.get(AuthService); 
    authService.registerUser(this.user);
    this._router.navigate(['/login']);

    /*
    this._authService
      .registerUser(user)
      .subscribe(res => {
        // localStorage.setItem('token', res.token); //  -- token shall be set only on login -- 
        this._router.navigate(['/login']);
      }, err => {
        this.displayError = err.message();
      });
    */
  }
  

}
