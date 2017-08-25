import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignUpService } from '../../services/user-sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-signin',
  templateUrl: './professor-signin.component.html',
  styleUrls: ['./professor-signin.component.css']
})
export class ProfessorSigninComponent implements OnInit {
  professorSigninForm: FormGroup;

  constructor(private fb: FormBuilder, private userSignUpService: UserSignUpService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.professorSigninForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      userType: 'PROFESSOR'
    })
  }

  onSubmit(){
    this.userSignUpService.signIn(this.professorSigninForm.value).subscribe(
      (data) => {
        this.router.navigateByUrl('profile');
        console.log(data);
        console.log(this.userSignUpService.signedIn());
      },
      (error) => console.log(this.professorSigninForm.value)
    );
  }

  signOut(){
    this.userSignUpService.signOut().subscribe(
      (data) => {
        console.log(data);
        console.log(this.userSignUpService.signedIn());
      },
      (error) => console.log(this.professorSigninForm.value)
    );
  }

}
