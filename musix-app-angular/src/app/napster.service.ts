import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class NapsterService {

  apiKey = '';
  constructor(private http: HttpClient) { }

  fetchTopArtists() {
    // api key:    
    // api secret:    
    // callback url:   musix-repo
    return this.http.get('http://api.napster.com/v2.2/artists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=16&lang=en-US');
  }

getArtistbyId(id){
  return this.http.get<any>('https://api.napster.com/v2.2/artists/'+ id +'?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&lang=en-US');
}

  getAlbum(){
    return this.http.get('http://api.napster.com/v2.2/albums/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=12&lang=en-US');
  }
  getTopTracks(artistid){
    let link1 = 'http://api.napster.com/v2.2/artists/'+ artistid+'/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10&lang=en-US'; //%${ environment.napsterApiKey }
    return this.http.get<any>(link1);
  }
  getAlbTracks(url){
    return this.http.get(url + '?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&lang=en-US');
  }

  searchSongs(searchString: string) {
    let url = "http://api.napster.com/v2.2/search/verbose?" +
    "apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=" + 
    searchString.replace(" ", "+"); // /\\s/gi
    return this.http.get<any>(url);
  }
  

  getAlbumById(albumId){
     return this.http.get<any>('http://api.napster.com/v2.2/albums/' + albumId +'/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&lang=en-US');
   
    }

  getAlbumofArtist(artistId){
        return this.http.get<any>('http://api.napster.com/v2.2/artists/' + artistId +'/albums/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=12&lang=en-US');
   }

}
