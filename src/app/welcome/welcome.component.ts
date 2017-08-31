import { Component, OnInit } from '@angular/core';
import { DataHelpersService } from '../services/data-helpers.service';
import { SearchResultsService } from '../services/search-results.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  searchForm: FormGroup;
  cities: object[];
  faculties: object[];
  courses: object[];
  subjects: object[];
  searchResults: object[];
  formSubmitted = false;


  constructor(private helperService: DataHelpersService, private searchResultsService: SearchResultsService, private router: Router, private fb: FormBuilder) {
    this.getCities();
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.searchForm = this.fb.group({
      city_id: '',
      faculty_id: '',
      course_id: '',
      subject_id: ''
    });
  }

  getCities(){
    this.helperService.getCities().subscribe(
      (response) => this.cities = response.json(),
      (error) => console.log(error)
    );
  }

  onCityChange(form_city_value) {
    this.getCityFaculties(form_city_value)
  }

  getCityFaculties(city_id: number){
    this.helperService.getCityFaculties(city_id).subscribe(
      (response) => this.faculties = response.json(),
      (error) => console.log(error)
    );
  }

  onFacultyChange(form_faculty_value){
    this.getFacultyCourses(form_faculty_value);
  }

  getFacultyCourses(faculty_id: number){
    this.helperService.getFacultyCourses(faculty_id).subscribe(
      (response) => this.courses = response.json(),
      (error) => console.log(error)
    );
  }

  onCourseChange(form_course_value){
    this.getCourseSubjects(form_course_value);
  }

  getCourseSubjects(course_id: number){
    this.helperService.getCourseSubjects(course_id).subscribe(
      (response) => this.subjects = response.json(),
      (error) => console.log(error)
    );
  }

}
