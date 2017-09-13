import { Component } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({

      //apiPath: 'https://secret-plains-11957.herokuapp.com',
      apiPath: 'http://localhost:3000',
      userTypes: [
        { name: 'PROFESSOR', path: 'professors' },
        { name: 'USER', path: 'users' }
      ],

      signOutPath: 'sign_out',
      validateTokenPath: 'validate_token',
      signInPath: 'sign_in',
      registerAccountPath: ''

    });
  }
}
