import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = "http://localhost:8080/login";
  registerUrl: string = "http://localhost:8080/register";
  logoutUrl: string = "http://localhost:8080/logout";

  constructor(private _http: HttpClient, private _router: Router) { }

  // Authentication has to happen at the server-end. 
  loginUser(user) {
    if(user.email != '' || user.email != 'admin' && user.password != 'admin' && user.password != '') {
      return new Promise<any>((resolve, reject) =>
      {
        this._http
        .post<any>(this.loginUrl, user)
        .subscribe(res => {
          const token = res.secretKey;
          localStorage.setItem('token', token);
          localStorage.setItem('email', res.email);
          console.log(res.secretKey);
          this._router.navigate(['/user']);
          return resolve(res)
        },error => reject("invalid login cred"));
      }); 
    } else {
      return new Promise((resolve, reject) => {
        return reject('incorrect credentials');
      });
    } 
  } 


  registerUser(user) {
    return this._http.post<any>(this.registerUrl, user).subscribe(res => {
      alert(user.name + " you are registered! Welcome to musix app");
      console.log("Registration successful" + res);
    }, err => console.log(err));
  }

  logoutUser() {

    let user = new User();
    user.email = localStorage.getItem('email');
    user.secretKey = localStorage.getItem('token');
    this._http.post<User>(this.logoutUrl, user).subscribe(res => console.log("logout message from server:", res),
    err => console.log(err));

    localStorage.removeItem('token');
    localStorage.removeItem('email');

    this._router.navigate(['/dashboard']);
  }

  private getToken(): boolean {
    // returns true if the token is present.
    return !!localStorage.getItem('token');
  }
  loggedIn() {
    return this.getToken();
  }

  getEmail() {
    if(localStorage.getItem('email')) {
      return localStorage.getItem('email');
    } else {
      return '';
    }
  }


}
