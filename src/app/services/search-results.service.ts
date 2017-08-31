import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class SearchResultsService {
  searchResults: object[];
  offer: object;

  constructor(private http: Http, private router: Router, private tokenService: Angular2TokenService) {}

  getSearchOffer(city_id: string, faculty_id: string, course_id: string, subject_id: string){
    return this.tokenService.get('offers/' + city_id + '/' + faculty_id + '/' + course_id + '/' + subject_id);
  }

  showOffer(offer_id: string){
    return this.tokenService.get('offer/' + offer_id);
  }

}
