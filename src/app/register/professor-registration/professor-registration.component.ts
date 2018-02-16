import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-professor-registration',
  templateUrl: './professor-registration.component.html',
  styleUrls: ['./professor-registration.component.css']
})
export class ProfessorRegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private _tokenService: Angular2TokenService) {
    this.createForm();
  }

  createForm(){
    this.registrationForm = this.fb.group({
      email: '',
      password: '',
      passwordConfirmation: '',
      userType: 'PROFESSOR'
    });
  }

  onSubmit(){
    this._tokenService.registerAccount(this.registrationForm.value).subscribe(
        res =>      console.log(res),
        error =>    console.log(error)
    );
  }

  ngOnInit() {
  }

}
