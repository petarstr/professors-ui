import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { Professor } from '../../models/professor';
import { DataHelpersService } from '../../services/data-helpers.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  professor: Professor;
  profileForm: FormGroup;
  formValid = false;
  formSubmitted = false;
  id: number;
  cities: object[];
  updated = false;

  constructor(private fb: FormBuilder, private http: Http, private tokenService: Angular2TokenService, private dataHelpersService: DataHelpersService) {
    this.createForm();
    console.log(localStorage.getItem('accessToken'));
    console.log(localStorage.getItem('client'));
    console.log(localStorage.getItem('expiry'));
    this.initializeProfessor();
    this.setCities();
    this.tokenService.validateToken().subscribe(
      (response) => {
        this.id = this.tokenService.currentUserData.id;
        this.getCurrentProfileData();
      },
      (error) => console.log(error)
    )
  }

  ngOnInit() {
  }

  createForm(){
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: '',
      facebook: '',
      city: ['', Validators.required],
      address: ''
    });
  }

  onSubmit(){
    this.formSubmitted = true;
    if(this.profileForm.status === 'VALID'){
      this.updateProfile();
    }
  }

  updateProfile(){
    this.tokenService.put('professors/' + this.id, JSON.stringify(this.profileForm.value)).subscribe(
      (response) => {
        console.log(response)
        this.updated = true;

      },
      (error) => console.log(error)
    )
  }

  getCurrentProfileData(){
    this.tokenService.get('professors/' + this.id + '/edit').subscribe(
      (response) => {
        this.professor.firstName = response.json().first_name;
        this.professor.lastName = response.json().last_name;
        this.professor.email = response.json().email;
        this.professor.phone = response.json().mobile_phone;
        this.professor.address = response.json().address;
        this.professor.facebook = response.json().facebook;
        this.professor.city = response.json().city_id;
        console.log(this.professor);
      },
      (error) => console.log(error)
    )
  }

  initializeProfessor(){
    this.professor = new Professor();
    this.professor.firstName = ''
    this.professor.lastName = ''
    this.professor.email = ''
  }

  setCities(){
    this.dataHelpersService.getCities().subscribe(
      (response) => {
        this.cities = response.json()
      }
    );
  }

}
