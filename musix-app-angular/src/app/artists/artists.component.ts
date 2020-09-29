import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NapsterService } from '../napster.service';
import { Router } from '@angular/router';
import { YoutubeService } from '../youtube.service';
import { Favourites } from '../Models/Favourites';
import { Recommends } from '../Models/Recommends';
import { Comments } from '../Models/Comments';
import { AuthService } from '../auth.service';
import { SpringInteractionService } from '../spring-interaction.service';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  public artistId;
  public artistName;

  tartist: boolean = true;
  talbum: boolean = false;
  tvideo: boolean = false;
  tsongs: boolean = false;

  albumArray: any[] = [];
  albTrackLinks: any[]=[];
  albSongs: any[] = [];
  albumSongs: any[] = [];
  albumId:String;
  albName:String;
  albumLink:String;
  artistBio :String;
  defaultId:String;

  // For youtube vids
  videoArray = []

  //for changing color
  favArrray:boolean[]=[false];
  recArray: boolean[]=[false];

  // from database to maintain prev state
  dbFavArray = [];
  dbRecArray = [];


  myimgurl:String = 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2016/09/500px-raw-lead-fstoppers_0.jpg?itok=MVzpK7Ej&timestamp=1474317531';
  // artistLink from the url
  artistLink: string = '';

// Constructor..................................................................................
  constructor(private _route: ActivatedRoute, 
    private napsterService: NapsterService, 
    private router: Router,
    private youtubeService: YoutubeService,
    private springService: SpringInteractionService,
    private _authService: AuthService) { 
      // artistLink from the url
    this.artistLink = _route.snapshot.paramMap.get("artistLink");
    this.loadPage();
  }

  ngOnInit(): void {
    this.getStates();
    let id= this._route.snapshot.paramMap.get('id');
    this.artistId=id;
    let name= this._route.snapshot.paramMap.get('name');
    this.artistName=name;
    this.albumLink='artists/' +this.artistId+ '/albums/top';

// --------------------------Fetching song links ---------------------------------------------- 
    this.napsterService.getAlbumofArtist(this.artistId).subscribe((response:any) =>
    {
      this.albumArray = response.albums;
      for(let alb of this.albumArray){
        this.albTrackLinks.push(alb.links.tracks.href);
        this.napsterService.getAlbTracks(alb.links.tracks.href).subscribe((res) =>{
          this.albSongs.push(res);
        });
      }
    });
//-------------------------------------------------------------------------------------------
    this.napsterService.getArtistbyId(this.artistId).subscribe((resp)=>{
      if(resp.artists[0].bios === undefined)
      {
        this.artistBio='No data available';
      }else{
      this.artistBio = resp.artists[0].bios[0].bio;
       this.defaultId= resp.artists[0].albumGroups.others[0];
    }
    });
  }

// .........................Logic to maintain prev state..........................
// albSongs contains track.previewUrl
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
    console.log("displaying albumSongs", this.albumSongs);
    this.albumSongs.forEach((track, index) => {
      console.log("comparing.....", index);
      this.dbFavArray.forEach(url2 => {
        console.log("getState: " + track.previewURL + " == " + url2)
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
      if(str == "artist") {
        this.tartist = true;
        this.talbum = false;
        this.tvideo = false;
        this.tsongs = false;
        return this.tartist;
      } else if(str == "album") {
        this.tartist = false;
        this.tvideo = false;
        this.talbum = true;
        this.tsongs = false;
        return this.talbum;
      }else if(str == "track"){
          this.tartist = false;
      this.talbum = false; 
      this.tsongs = true;
      this.tvideo = false;
      // this.loadPage();
      return this.tsongs;
      }
      this.tartist = false;
      this.tvideo = true;
      this.talbum = false;
      this.tsongs = false;
      return this.tvideo;
    }


    fetchAlbum(album){
      if(album.id == undefined){
        this.albumId = this.defaultId;
      }
      else{
        this.albumId = album.id;
      }

      this.loadPage();

      this.tsongs=true;
      this.tartist = false;
      this.tvideo = false;
      this.talbum = false;
    }
    
    loadPage(){
      if(this.albumId == undefined){
         this.albumId = 'alb.505979084';//giving this as default songs 'alb.505979084';//
     /*    this.napsterService.getTopTracks(this.artistId).subscribe((response:any) =>{ 
          this.albumSongs = response;
          console.log(this.artistId);
          console.log(this.albumSongs);
          // this.albName = this.albumSongs[1].albumName;
        }); */
      }

      this.napsterService.getAlbumById(this.albumId).subscribe((response:any) =>
      {
        this.albumSongs=response.tracks;
        this.albName = this.albumSongs[0].albumName;
        this.videoArray = [];
        this.fetchVideos(this.albumSongs);
        // after fetching the album songs we will mark the status of each song.
        this.markStatus();
      });
    
    }


    addOrRemoveFavourite(trackId, trackName,i, previewUrl) {
      if(this._authService.loggedIn()) {
        
        this.favArrray[i] = !this.favArrray[i];
        console.log("not/fav " + trackId, trackName);

        let favourite = new Favourites();

        favourite.songName = trackName;
        favourite.useremail = this._authService.getEmail();
        favourite.songUrl = previewUrl;

        return this.springService.addOrRemoveFav(favourite).subscribe(res => console.log(res), err => console.log(err));
      } else alert("you need to login first");
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
      else 
        alert("you need  to login first!");
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
      else 
        alert("you need to login first!");
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



}  // end of class.
    
