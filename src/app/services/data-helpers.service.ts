import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataHelpersService {

  constructor(private http: Http){ }

  getCities(){
    return this.http.get('http://localhost:3000/cities');
  }

  getSubjects(){
    return this.http.get('http://localhost:3000/subjects');
  }

  getCityFaculties(city_id: number){
    return this.http.get('http://localhost:3000/city/' + city_id + '/faculties');
  }

  getFacultyCourses(faculty_id: number){
    return this.http.get('http://localhost:3000/faculty/' + faculty_id + '/courses');
  }

  getCourseSubjects(course_id: number){
    return this.http.get('http://localhost:3000/course/' + course_id + '/subjects');
  }

}
