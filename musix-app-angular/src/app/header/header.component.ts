import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NapsterService } from '../napster.service';
import { Router } from '@angular/router';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  searchBarVisible: boolean = true;
  searchString; 
  constructor(private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    if(!!localStorage.getItem('searchToken')) {
      this.searchBarVisible = false;
    }
  }

  loggedIn() {
    return this._authService.loggedIn();
  }
  logoutUser() {
    return this._authService.logoutUser();
  }

  makeSearch() {
    this.searchBarVisible = true;
    localStorage.removeItem('searchToken');
    this._router.navigate(['/dashboard']);
  }
  searchNapster() {
    localStorage.setItem('searchToken', 'searchedNapster');
    this.searchBarVisible = false;
    console.log("searched made ! and searchbar disabled!");
    this.searchString = document.getElementById("search");
    console.log(this.searchString.value);
    this._router.navigate(['/searchResults', this.searchString.value]);
  }
  
}
