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
      userTypes: [
        { name: 'PROFESSOR', path: 'http://localhost:3000/professors' },
        { name: 'USER', path: 'http://localhost:3000/users' }
      ],

      signOutPath: 'sign_out',
      validateTokenPath: 'validate_token',
      signInPath: 'sign_in',
      registerAccountPath: ''

    });
  }
}
