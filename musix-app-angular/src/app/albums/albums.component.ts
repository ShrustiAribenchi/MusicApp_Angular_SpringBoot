import { Component, OnInit } from '@angular/core';
import { NapsterService} from '../napster.service';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtube.service';
import { Favourites } from '../Models/Favourites';
import { Recommends } from '../Models/Recommends';
import { Comments } from '../Models/Comments';
import { AuthService } from '../auth.service';
import { SpringInteractionService } from '../spring-interaction.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(private napsterServices: NapsterService, 
    private youtubeService: YoutubeService,
    private route: ActivatedRoute,
    private springService: SpringInteractionService,
    private _authService: AuthService) { }

  dataArray: any[] = [];
  albumArray: any[] = [];
  albTrackLinks: any[]=[];
  albSongs: any[] = [];
  albumId: String = '';
  albName:String;
  artistName:String;
  
  tvideo: boolean = false;
  tsongs: boolean = true;
   
  // for youtube vids
  videoArray = [];

  //for changing color
  favArrray:boolean[]=[false];
  recArray: boolean[]=[false];

  // from database to maintain prev state
  dbFavArray = [];
  dbRecArray = [];

  ngOnInit(): void {
    this.getStates();
    this.albumId=this.route.snapshot.paramMap.get('albumId');

    this.napsterServices.getAlbumById(this.albumId).subscribe((response:any) =>
      {
        this.albSongs=response.tracks;
        this.albName = this.albSongs[0].albumName;
        this.artistName = this.albSongs[0].artistName;
        this.fetchVideos(this.albSongs);
      }).add(() => {
        setTimeout(() => {this.markStatus()}, 3000)
        
      });
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
    this.albSongs.forEach((track, index) => {
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
  
  toggle(str: string) {
    if(str == "track") {
      this.tvideo = false;
      this.tsongs = true;
      return this.tsongs;
    }
    this.tvideo = true;
    this.tsongs = false;
    return this.tvideo;
  }

  addOrRemoveFavourite(trackId, trackName,i, previewUrl) {
    if(this._authService.loggedIn()) {
      this.favArrray[i] = !this.favArrray[i];
      let favourite = new Favourites();
      favourite.songName = trackName;
      favourite.useremail = this._authService.getEmail();
      favourite.songUrl = previewUrl;
      return this.springService.addOrRemoveFav(favourite).subscribe(res => console.log(res), err => console.log(err));
    }  
    else 
      alert("you need to login first"); 
    console.log("not/fav " + trackId, trackName);

    
  }
  recommendOrUnrecommend(trackId, trackName,i, previewUrl) {
    if(this._authService.loggedIn()) {
      this.recArray[i] = !this.recArray[i];
      console.log("un/recommend " + trackId, trackName); 
      
      let recommend = new Recommends();
      recommend.songName = trackName;
      recommend.songUrl = previewUrl;
      recommend.useremail = this._authService.getEmail();
      return this.springService.addOrRemoveRec(recommend).subscribe(res => console.log(res), err => console.log(err));
    }
    else alert("you need to login first!");
  }

  postComment(trackId, trackName) {
    if(this._authService.loggedIn()) {
      console.log("post function called");
      let inputElement = <HTMLInputElement>document.getElementById(`input:${trackId}`);
      console.log(inputElement.value, trackName);
      let buttonElement = document.getElementById(`button:${trackId}`);
      inputElement.style.visibility = "hidden";
      buttonElement.style.visibility = "hidden";

      let comment = new Comments();
      comment.comment = inputElement.value;
      comment.songName = trackName;
      comment.useremail = this._authService.getEmail();
      return this.springService.addComment(comment).subscribe(res => console.log(res), err => console.log(err));
    }
    else alert("login first!");
  }

  setCommentVisible(trackId) {
    console.log("visibility function called" + trackId);
    let inputElement = document.getElementById(`input:${trackId}`);
    let buttonElement = document.getElementById(`button:${trackId}`);
    inputElement.style.visibility = "visible";
    buttonElement.style.visibility = "visible";
  }

  // fetching videos: https://www.youtube.com/watch?v=videoId
  fetchVideos(albumSongs) {
    albumSongs
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
