import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class DataHelpersService {

  constructor(private http: Http, private tokenService: Angular2TokenService){ }

  getCities(){
    return this.tokenService.get('cities');
  }

  getSubjects(){
    return this.tokenService.get('subjects');
  }

  getCityFaculties(city_id: number){
    return this.tokenService.get('city/' + city_id + '/faculties');
  }

  getFacultyCourses(faculty_id: number){
    return this.tokenService.get('faculty/' + faculty_id + '/courses');
  }

  getCourseSubjects(course_id: number){
    return this.tokenService.get('course/' + course_id + '/subjects');
  }

}
