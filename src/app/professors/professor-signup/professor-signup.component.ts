import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignUpService } from '../../services/user-sign-up.service';
import { Router } from '@angular/router';
import { DataHelpersService } from '../../services/data-helpers.service';


@Component({
  selector: 'app-professor-signup',
  templateUrl: './professor-signup.component.html',
  styleUrls: ['./professor-signup.component.css']
})
export class ProfessorSignupComponent implements OnInit {
  professorSignupForm: FormGroup;
  cities: object[];

  constructor(private fb: FormBuilder, private userSignUpService: UserSignUpService, private router: Router, private dataHelpersService: DataHelpersService) {
    this.createForm();
  }

  ngOnInit() {
    this.getCities();
  }

  createForm(){
    this.professorSignupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      city_id: ['', Validators.required],
      userType: 'PROFESSOR'
    })
  }

  onSubmit(){
    this.userSignUpService.signUp(this.professorSignupForm.value).subscribe(
      (data) => {
        this.router.navigateByUrl('profile');
        console.log(data);
        console.log(this.userSignUpService.signedIn());
      },
      (error) => {
        console.log(this.professorSignupForm.value);
        console.log(error);
      }
    );
  }

  getCities(){
    this.dataHelpersService.getCities().subscribe(
      (data) => {
        this.cities = data.json();
        console.log(this.cities);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
