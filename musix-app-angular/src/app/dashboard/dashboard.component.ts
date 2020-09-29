import { ArtistsComponent } from './../artists/artists.component';
import { Component, OnInit } from '@angular/core';
import { NapsterService } from '../napster.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  albumArray: any[] = [];
  artists:any[]=[];
  bios:any[]=[];

constructor(private napsterService:NapsterService, private router: Router) { }

  ngOnInit(): void {
    this.napsterService.fetchTopArtists().subscribe((response:any)=>{
      this.artists=response.artists;
    });

    this.napsterService.getAlbum().subscribe((response:any) =>
    {
      this.albumArray = response.albums;
    });
  }
  
  open(artist){
    this.router.navigate(['/artist',artist.id,artist.name]);
  }

  openAlbum(album){
    this.router.navigate(['/album',album.id]);
  }
  }
