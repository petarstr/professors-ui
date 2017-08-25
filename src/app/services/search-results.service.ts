import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';


@Injectable()
export class SearchResultsService {
  searchResults: object[];
  offer: object;

  constructor(private http: Http, private router: Router) {}

  getSearchOffer(city_id: string, faculty_id: string, course_id: string, subject_id: string){
    return this.http.get('http://localhost:3000/offers/' + city_id + '/' + faculty_id + '/' + course_id + '/' + subject_id);
  }

  showOffer(offer_id: string){
    return this.http.get('http://localhost:3000/offer/' + offer_id);
  }

}
