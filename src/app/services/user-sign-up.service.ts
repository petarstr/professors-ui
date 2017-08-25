import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class UserSignUpService {
  redirectUrl: string;
  constructor(private http: Http, private tokenService: Angular2TokenService){}

  signUp(body){
    return this.tokenService.registerAccount(body);
  }

  signIn(body){
    return this.tokenService.signIn(body);
  }

  signOut(){
    return this.tokenService.signOut();
  }

  signedIn(){
    return this.tokenService.userSignedIn();
  }
}
