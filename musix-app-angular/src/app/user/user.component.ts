import { Component, OnInit } from '@angular/core';
import { Favourites } from '../Models/Favourites';
import { Recommends } from '../Models/Recommends';
import { Comments } from '../Models/Comments';
import { User } from '../Models/User';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { SpringInteractionService } from '../spring-interaction.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
/*
  tcomments: boolean = true;
  tfavourites: boolean = false;
  trecommendation: boolean = false;
  tcountrySpecial: boolean = false;
*/
tprofile: boolean = true;
tfavourite: boolean = false;
trecommend: boolean = false;
tcomment: boolean = false;
url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTmV_GMmai8gMADcJbWJgdA7VNIEN1Bx1strQ&usqp=CAU';
ronaldo = "https://lh3.googleusercontent.com/-UUobfMfUm9I/Vv_u0XYn8rI/AAAAAAAAM1o/O9ez9hSNnFI/s640/Cristiano%252520Ronaldo%252520-dp-profile-picture-702.jpg";
// User Deatils:  'userData' can be replaced with the below object.
  userDetails: User = new User();

//changing profile photo
 /*  url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC';

  onSelectFile(event) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.url = event.target.result;
          this.userData.img = this.url;
        }
      }
  } */


  commentArray: Comments[] = [];
  favArray: Favourites[] = [];
  recArray: Recommends[] = [];

  constructor(
    private springService: SpringInteractionService,
    private _authService: AuthService, 
    private _router: Router
    ) { }

  ngOnInit(): void {
    let email = this._authService.getEmail();
    
    let comment = new Comments();
    comment.useremail = email;

    let fav = new Favourites();
    fav.useremail = email;

    let rec = new Recommends();
    rec.useremail = email;

    let user = new User();
    user.email = email;

    this.springService.getAllComments(comment).subscribe(res => {
      res.forEach(comment => this.commentArray.push(comment));
    }, err => console.log("error at comments " + err));
    
    this.springService.getAllFavs(fav).subscribe(res => {
      res.forEach(fav => this.favArray.push(fav));
    }, err => console.log("error at favs " + err));

    this.springService.getAllRecs(rec).subscribe(res => {
      res.forEach(rec => this.recArray.push(rec));
    }, err => console.log("error at recs " + err));

    this.springService.getUserDetails(user).subscribe(res => {
      this.userDetails = res;
    }, err => console.log(err));
  }

  toggle(str: string) {
    
    if(str == "profile")
    {
      this.tprofile = true;
      this.tfavourite = false;
      this.trecommend = false;
      this.tcomment = false;
      return this.tprofile;
    }else if(str == "favourite")
    {
      this.tprofile = false;
      this.tfavourite = true;
      this.trecommend = false;
      this.tcomment = false;
      return this.tfavourite;
    } else if(str == "comment") {
      this.tcomment = true;
      this.tfavourite = false;
      this.trecommend = false;
      this.tprofile = false;
      return this.tcomment;
    }
      this.tprofile = false;
      this.tfavourite = false;
      this.trecommend = true;
      this.tcomment = false;
      return this.trecommend;
  }

  updateProfile() {
    this._router.navigate(['/updateProfile']);
  }

  /*
  toggle(str: string) {
    if(str == "comments") {
      this.tcomments = true;
      this.tfavourites = false;
      this.trecommendation = false;
      this.tcountrySpecial = false;

      return this.tcomments;

    } else if(str == "favourites") {
      this.tcomments = false;
      this.tfavourites = true;
      this.trecommendation = false;
      this.tcountrySpecial = false;

      return this.tfavourites;

    } else if(str == 'recommendation') {
      this.tcomments = false;
      this.tfavourites = false;
      this.trecommendation = true;
      this.tcountrySpecial = false;

      return this.trecommendation;
    }
    
    this.tcomments = false;
    this.tfavourites = false;
    this.trecommendation = false;
    this.tcountrySpecial = true;

    return this.tcountrySpecial;
  }
  */
}
