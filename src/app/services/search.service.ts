import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class SearchService {

  constructor(private _tokenService: Angular2TokenService) { }

  getCities(){
    return this._tokenService.get('cities')
  }

  getFaculties(city_id){
    return this._tokenService.get('cities/' + city_id + '/faculties')
  }

  getCourses(faculty_id){
    return this._tokenService.get('faculties/' + faculty_id + '/courses')
  }

  getSubjects(course_id){
    return this._tokenService.get('courses/' + course_id + '/subjects')
  }

}
