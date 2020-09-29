import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from "@angular/forms";
import { CarouselModule } from 'ngx-owl-carousel-o';  // This is for the dashboard's carousel
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// MDB Angular Free
import { IconsModule } from 'angular-bootstrap-md';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ButtonsModule, InputsModule } from 'angular-bootstrap-md';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component'
import { NapsterService } from './napster.service';
import { YoutubeService } from './youtube.service'; 
import { SpringInteractionService } from './spring-interaction.service';
import { DashboardInnerComponent } from './dashboard-inner/dashboard-inner.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    SearchResultComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    AlbumsComponent,
    ArtistsComponent,
    DashboardInnerComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    IconsModule,
    MDBBootstrapModule.forRoot(),
    ButtonsModule,
    InputsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, NapsterService, 
    YoutubeService, SpringInteractionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*
{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }

 */ 