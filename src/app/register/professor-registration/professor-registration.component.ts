import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-registration',
  templateUrl: './professor-registration.component.html',
  styleUrls: ['./professor-registration.component.css']
})
export class ProfessorRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  cities: any;
  formSubmitted = false;
  errors: any;

  constructor(private fb: FormBuilder, private _tokenService: Angular2TokenService) {
    this.createForm();
    this.getCities();
  }

  createForm(){
    this.registrationForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      city_id: ['', Validators.required],
      userType: 'PROFESSOR'
    });
  }

  onSubmit(){
    this.formSubmitted = true;
    this._tokenService.registerAccount(this.registrationForm.value).subscribe(
        res => {
          this.router.navigateByUrl('professors/profile');
        },
        error => {
          this.errors = JSON.parse(error._body).errors.full_messages
        }
    );
  }

  getCities(){
    this._tokenService.get('cities').subscribe(
      (response) => {
        this.cities = response.json();
      }
    );
  }

  ngOnInit() {
  }

}
