import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { SpringInteractionService } from '../spring-interaction.service'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user = new User();
  userDetails: User;  // data from db

  constructor(
    private springService: SpringInteractionService,
    private _authService: AuthService,
    private _router: Router) { }
  
    qImage: boolean;
    qPass: boolean;
  ngOnInit(): void {
    
    // get user details
    let u = new User();
    u.email = this._authService.getEmail();
    this.springService.getUserDetails(u).subscribe(res => this.userDetails = res);

    let x = prompt("update profile image ? Y or N");
    let  y = prompt("update password ? Y or N");
    console.log('prompt values', x, y);
    this.qImage = (x == "y" || x == 'Y') ? true : false;
    this.qPass = (y == "y" || y == 'Y') ? true : false;
    console.log(this.qImage, this.qPass);
  }

  updateProfile() {
    
    if(this.qImage && this.qPass) {
      // update both image and pass.
      if(this._authService.loggedIn()) {
        this.user.email = this._authService.getEmail();
        console.log("updating profile", this.user);
        
        this.springService.updateProfile(this.user)
        .subscribe(
          res => {
            console.log(res);
            this._router.navigate(['/user']);
          }
        );
      } else {
        alert("you should be logged in! ");
        this._router.navigate(['/login']);
      }
    } else if(this.qImage && !this.qPass) {
      // update only image
      if(this._authService.loggedIn()) {
        this.user.email = this._authService.getEmail();
        this.user.password = this.userDetails.password;
        // console.log("updating profile", this.user);
        
        this.springService.updateProfile(this.user)
        .subscribe(
          res => {
            console.log("profile successfully updated");
            this._router.navigate(['/user']);
          }
        );
      } else {
        alert("you should be logged in! ");
        this._router.navigate(['/login']);
      }
    } else if(!this.qImage && this.qPass) {
        // update only passcode
        if(this._authService.loggedIn()) {
          this.user.email = this._authService.getEmail();
          this.user.displayPicture = this.userDetails.displayPicture;
          // console.log("updating profile", this.user);
          
          this.springService.updateProfile(this.user)
          .subscribe(
            res => {
              console.log("profile successfully updated");
              this._router.navigate(['/user']);
            }
          );
        } else {
          alert("you should be logged in! ");
          this._router.navigate(['/login']);
        }
    } else {
      alert('profile not updated. redirecting you back.');
      this._router.navigate(['/user']);
    }
    
    
  }
}
