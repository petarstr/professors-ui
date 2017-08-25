import { Component, OnInit } from '@angular/core';
import { UserSignUpService } from '../services/user-sign-up.service';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
  signedIn: boolean;
  userType: string;

  constructor(private authService: UserSignUpService, private tokenService: Angular2TokenService, private router: Router) { }

  ngOnInit() {
    this.signedIn = this.authService.signedIn();
    this.userType = this.tokenService.currentUserType;
  }

  signOut(){
    this.authService.signOut().subscribe(
      (data) => {
        console.log(this.router.url);
        if(this.router.url === '/welcome') {
          window.location.reload();
        } else {
          this.router.navigateByUrl('welcome');
        }
      },
      (error) => console.log(error)
    );
  }

}
