import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-login',
  templateUrl: './professor-login.component.html',
  styleUrls: ['./professor-login.component.css']
})
export class ProfessorLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _tokenService: Angular2TokenService, private router: Router) {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      email: '',
      password: '',
      userType: 'PROFESSOR'
    });
  }

  onSubmit(){
    this._tokenService.signIn(this.loginForm.value).subscribe(
        res => {
          console.log(res);
          console.log(localStorage.getItem('accessToken'));
          console.log(localStorage.getItem('client'));
          console.log(localStorage.getItem('expiry'));
          console.log(localStorage.getItem('tokenType'));
          console.log(localStorage.getItem('uid'));
          this.router.navigateByUrl('professors/profile');
        },
        error => console.log(error)
    );
  }

  ngOnInit() {
  }

}
