import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataHelpersService } from '../../services/data-helpers.service';
import { Angular2TokenService } from 'angular2-token';
import { Http } from '@angular/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offerForm: FormGroup;
  subjects: object[];
  id: number;
  formSubmitted = false;
  faculties: object[];
  courses: object[];
  currentProfessorCityId: number;

  constructor(private fb: FormBuilder, private dataHelpersService: DataHelpersService, private tokenService: Angular2TokenService, private http: Http, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      (response) => {
        this.id = this.tokenService.currentUserData.id;
        this.currentProfessorCityId = this.tokenService.currentUserData['city_id'];
        this.getCityFaculties(this.currentProfessorCityId);
      }
    )
  }

  createForm(){
    this.offerForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      faculty_id: ['', Validators.required],
      course_id: ['', Validators.required],
      subject: ['', Validators.required],
      number_of_sessions: ['', Validators.required],
      user_place: ['', Validators.required],
      professor_place: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  onSubmit(){
    this.formSubmitted = true;
    if(this.offerForm.status === 'VALID'){
      this.createOffer();
    }
  }

  createOffer(){
    this.tokenService.post('professors/' + this.id + '/offers', JSON.stringify(this.offerForm.value)).subscribe(
      (response) => {
      this.router.navigateByUrl('/professor/offers')
      },
      (error) => console.log(error)
    )
  }

  getCityFaculties(city_id: number){
    this.dataHelpersService.getCityFaculties(city_id).subscribe(
      (response) => this.faculties = response.json(),
      (error) => console.log(error)
    );
  }

  onFacultyChange(form_faculty_value){
    this.getFacultyCourses(form_faculty_value);
  }

  getFacultyCourses(faculty_id: number){
    this.dataHelpersService.getFacultyCourses(faculty_id).subscribe(
      (response) => this.courses = response.json(),
      (error) => console.log(error)
    );
  }

  onCourseChange(form_course_value){
    this.getCourseSubjects(form_course_value);
  }

  getCourseSubjects(course_id: number){
    this.dataHelpersService.getCourseSubjects(course_id).subscribe(
      (response) => this.subjects = response.json(),
      (error) => console.log(error)
    );
  }

}
