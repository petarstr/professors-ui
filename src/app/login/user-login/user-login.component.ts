import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _tokenService: Angular2TokenService) {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      email: '',
      password: '',
      userType: 'USER'
    });
  }

  onSubmit(){
    this._tokenService.signIn(this.loginForm.value).subscribe(
        res =>      console.log(res),
        error =>    console.log(error)
    );
  }

  ngOnInit() {
  }

}
