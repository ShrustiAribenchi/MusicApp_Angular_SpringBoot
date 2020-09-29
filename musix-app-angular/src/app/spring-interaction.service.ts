import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favourites } from './Models/Favourites';
import { Recommends } from './Models/Recommends';
import { Comments } from './Models/Comments';
import { User} from './Models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpringInteractionService {

  constructor(private _http: HttpClient, 
    private _router: Router) { }

  favUrl: string = "http://localhost:8080/favourites";
  favUrl2: string = "http://localhost:8080/favourites/all";

  recUrl: string = "http://localhost:8080/recommends";
  recUrl2: string = "http://localhost:8080/recommends/all";

  comUrl: string = "http://localhost:8080/comments";
  comUrl2: string = "http://localhost:8080/comments/all";

  token: string = 'Bearer ' + localStorage.getItem('token');
  httpHeaders: HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': this.token
    }
  );
  options = { headers: this.httpHeaders};

  addOrRemoveFav(fav: Favourites) {
    return this._http.post<Favourites>(this.favUrl, fav, this.options);
  }

  addOrRemoveRec(rec: Recommends) {
    return this._http.post<Recommends>(this.recUrl, rec, this.options);
  }

  getAllFavs(fav: Favourites) {
    return this._http.post<Favourites[]>(this.favUrl2, fav, this.options);
  }

  getAllRecs(rec: Recommends) {
    return this._http.post<Recommends[]>(this.recUrl2, rec, this.options);
  }

  addComment(com: Comments) {
    return this._http.post<Comments>(this.comUrl, com, this.options);
  }
  getAllComments(com) {
    return this._http.post<Comments[]>(this.comUrl2, com, this.options);
  }

  // TODO: we need to implement these 2 methods in the backend.
  updateProfile(user) {
    let updateUrl = "http://localhost:8080/updateProfile";
    return this._http.post<User>(updateUrl, user, this.options);
  }

  getUserDetails(user: User) {
    let userDetailUrl = "http://localhost:8080/userDetails/" + user.email;
    return this._http.get<User>(userDetailUrl, this.options);
  }
}
