import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private _http: HttpClient) { }


  API_KEY: string = "AIzaSyD9f05xqqiAqia9V04TurYgSeHBfRYtW7Y";

  searchVideos(songName: string): Observable<any> {
    // we fetch only one video per song.
    let searchUrl = "https://www.googleapis.com/youtube/v3/search?" +
    "key=" + this.API_KEY + "&type=video&part=snippet&maxResults=1&q=" + 
    songName + "&regionCode=IN&videoCategoryId=10";

    console.log("A search was made to youtube = " + songName);
    return this._http.get<any>(searchUrl);  
  }


}
