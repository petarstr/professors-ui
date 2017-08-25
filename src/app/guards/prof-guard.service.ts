import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ProfGuard implements CanActivate {

  constructor(private tokenService: Angular2TokenService){}

  canActivate() {
    if(this.tokenService.currentUserType == 'PROFESSOR') {
      return true;
    }
    return false;
  }
}
