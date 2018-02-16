import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  cities: object[];
  faculties: object[];
  courses: object[];
  subjects: object[];
  selectedCity: any;
  selectedFaculty: any;
  selectedCourse: any;
  selectedSubject: any;

  constructor(private _tokenService: Angular2TokenService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(){
    this._tokenService.get('cities').subscribe(
      (response) => {
        this.cities = response.json();
      }
    );
  }

  getFaculties(){
    this._tokenService.get('cities/' + this.selectedCity.id + '/faculties').subscribe(
      (res) => {
        this.faculties = res.json();
      },
      (err) => console.log(err)
    )
  }

  getCourses(){
    this._tokenService.get('faculties/' + this.selectedFaculty.id + '/courses').subscribe(
      (res) => {
        this.courses = res.json();
      },
      (err) => console.log(err)
    )
  }

  getSubjects(){
    this._tokenService.get('courses/' + this.selectedCourse.id + '/subjects').subscribe(
      (res) => {
        this.subjects = res.json();
      },
      (err) => console.log(err)
    )
  }

  search(){
    console.log(this.selectedSubject);
  }

  clearAll(){
    this.selectedFaculty = null;
    this.selectedCourse = null;
    this.selectedSubject = null;
  }

  clearCoursesSubjects(){
    this.selectedCourse = null;
    this.selectedSubject = null;
  }

  clearSubjects(){
    this.selectedSubject = null;
  }

}
