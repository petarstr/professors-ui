import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignUpService } from '../../services/user-sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {
  userSigninForm: FormGroup;
  jsonObject: object;

  constructor(private fb: FormBuilder, private userSignUpService: UserSignUpService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.userSigninForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      userType: 'USER'
    })
  }

  onSubmit(){
    this.userSignUpService.signIn(this.userSigninForm.value).subscribe(
      (data) => {
        this.router.navigateByUrl('/welcome');
        console.log(this.userSignUpService.signedIn());
      },
      (error) => console.log(this.userSigninForm.value)
    );
  }

  signOut(){
    this.userSignUpService.signOut().subscribe(
      (data) => {
        console.log(data);
        console.log(this.userSignUpService.signedIn());
      },
      (error) => console.log(this.userSigninForm.value)
    );
  }
}
