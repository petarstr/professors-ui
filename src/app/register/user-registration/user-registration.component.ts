import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private _tokenService: Angular2TokenService) {
    this.createForm();
  }

  createForm(){
    this.registrationForm = this.fb.group({
      email: '',
      password: '',
      passwordConfirmation: '',
      userType: 'USER'
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
