import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NapsterService } from '../napster.service';
import { ActivatedRoute, Router } from '@angular/router';
import {YoutubeService} from '../youtube.service';
import { SpringInteractionService } from '../spring-interaction.service';
import { Favourites } from '../Models/Favourites';
import { Recommends } from '../Models/Recommends';
import { Comments } from '../Models/Comments';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  // artists;
  searchString: string;
  artistArray = []
  

  // tracks
  tracksArray = [];

  // youtube
  videoArray = [];

  //for changing color
  favArrray:boolean[]=[false];
  recArray: boolean[]=[false];

  // from database to maintain prev state
  dbFavArray = [];
  dbRecArray = [];

  constructor(private _napsterService: NapsterService, 
    private _route: ActivatedRoute, private _router: Router,
    private youtubeService: YoutubeService,
    private springService: SpringInteractionService,
    private _authService: AuthService) {
   }


  ngOnInit(): void {
    this.getStates();
    this.searchString = this._route.snapshot.paramMap.get("searchString"); //params.subscribe(params => this.searchString = params['search']);
    this.searchNapster();
    
    setTimeout(() => {
      this.markStatus();
    }, 1300);
    

  }

  getStates() {
    console.log("getStates called");
    let fav = new Favourites();
    fav.useremail = localStorage.getItem('email');

    this.springService
    .getAllFavs(fav)
    .subscribe(res => {
      res.forEach(f => {
        console.log(f.songUrl + " fetched");
        if(f.favourite == "yes")
          this.dbFavArray.push(f.songUrl);
      })
    });

    let rec = new Recommends();
    rec.useremail = localStorage.getItem('email');

    this.springService
    .getAllRecs(rec)
    .subscribe(res => {
      res.forEach(f => {
        if(f.recommend == "yes")
          this.dbRecArray.push(f.songUrl)
      });
    });
  } 

  markStatus() {
    this.tracksArray.forEach((track, index) => {
      this.dbFavArray.forEach(url2 => {
        console.log("markStatus: " + track.previewURL + " == " + url2);
        if (track.previewURL == url2) {
          this.favArrray[index] = true;
        }
        console.log(this.favArrray);
      });

      this.dbRecArray.forEach(url3 => {
        if(track.previewURL == url3) this.recArray[index] = true;
      });
    });
  }
  


  searchNapster() {
    this._napsterService.searchSongs(this.searchString).subscribe(res => {
      this.artistArray = res.search.data.artists.slice(0, 1);
      this.tracksArray = res.search.data.tracks.slice(0, 7);
      this.fetchVideos(this.tracksArray);
    },
    err => {
      console.log(err)
    }).add(() => {
      this.markStatus();
    });
  }

  addOrRemoveFavourite(trackId, trackName,i, previewUrl) {
    if(this._authService.loggedIn()) {
      let favourite = new Favourites();
      favourite.songName = trackName;
      favourite.useremail = this._authService.getEmail();
      favourite.songUrl = previewUrl;

      this.favArrray[i] = !this.favArrray[i];
      console.log("not/fav " + trackId, trackName);
      
      return this.springService.addOrRemoveFav(favourite).subscribe(res => console.log(res), err => console.log(err));
    } else alert("login first");
  }
  recommendOrUnrecommend(trackId, trackName,i, previewUrl) {
    if(this._authService.loggedIn()) {
      let recommend = new Recommends();
      recommend.songName = trackName;
      recommend.songUrl = previewUrl;
      recommend.useremail = this._authService.getEmail();

      this.recArray[i] = !this.recArray[i];
      console.log("un/recommend " + trackId, trackName); 

      return this.springService.addOrRemoveRec(recommend).subscribe(res => console.log(res), err => console.log(err));
    } else alert("login first");
  }

  postComment(trackId, trackName) {
    if(this._authService.loggedIn()) {
      let comment = new Comments();

      console.log("post function called");
      let inputElement = <HTMLInputElement>document.getElementById(`input:${trackId}`);
      console.log(inputElement.value, trackName);
      let buttonElement = document.getElementById(`button:${trackId}`);
      inputElement.style.visibility = "hidden";
      buttonElement.style.visibility = "hidden";

      comment.comment = inputElement.value;
      comment.songName = trackName;
      comment.useremail = this._authService.getEmail();
      return this.springService.addComment(comment).subscribe(res => console.log(res), err => console.log(err));
  
    } else alert("login first");
  }

  setCommentVisible(trackId) {
    console.log("visibility function called" + trackId);
    let inputElement = document.getElementById(`input:${trackId}`);
    let buttonElement = document.getElementById(`button:${trackId}`);
    inputElement.style.visibility = "visible";
    buttonElement.style.visibility = "visible";
  }
  openArtist(artist) {
    this._router.navigate(['/artist', artist.id, artist.name]);
  }
    // fetching videos: https://www.youtube.com/watch?v=videoId
    fetchVideos(tracks) {
      tracks
      .forEach(
        track => {
          this.youtubeService
          .searchVideos(track.name)
          .subscribe(
            res => {
              // we store the first video of  Resultantarray of every song search.
              this.videoArray.push(res.items[0]);
            },
            err => {
              console.log(err);
            }
          );  // end of subscribe;
        });
    } // end of function

}
