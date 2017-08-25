import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignUpService } from '../../services/user-sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup;

  constructor(private fb: FormBuilder, private userSignUpService: UserSignUpService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.userSignupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      userType: 'USER'
    })
  }

  onSubmit(){
    this.userSignUpService.signUp(this.userSignupForm.value).subscribe(
      (data) => {
        this.router.navigateByUrl('/welcome');
        console.log(this.userSignUpService.signedIn());
      },
      (error) => console.log(error)
    );
  }

}
