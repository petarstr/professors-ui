import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professor } from '../../models/professor';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  professor: object;
  cities: object[];
  profileUpdated = false;
  updatingProfile = false;

  imagePlaceholder = 'https://www.safeocs.gov/cos/resources/app/images/av1_1.png';

  constructor(private _tokenService: Angular2TokenService, private router: Router, private fb: FormBuilder, private file: FileUploadService) {
    this.professor = new Professor();
    this.professor['image'] = { url: this.imagePlaceholder };
    this.createForm();
  }

  ngOnInit() {
    this.getCurrentProfessor();
    this.getCities();
  }

  createForm(){
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      mobile_phone: '',
      phone: '',
      facebook: '',
      city_id: ['', Validators.required],
      street_name: '',
      image: null
    });
  }

  getCurrentProfessor(){
    this._tokenService.get('professors/edit').subscribe(
      res => {
        this.professor = res.json();
        console.log(this.professor);
      },
      error => console.log(error)
    )
  }

  getCities(){
    this._tokenService.get('cities').subscribe(
      (response) => {
        this.cities = response.json();
      }
    );
  }

  signOut(){
    this._tokenService.signOut().subscribe(
      res => {
        this.router.navigateByUrl('/');
      },
      error => console.log(error)
    )
  }

  fileChange(event){
    this.file.fileChange(event).subscribe(
      res => {
        localStorage.setItem('accessToken', res.headers.get('access-token'))
        localStorage.setItem('client', res.headers.get('client'))
        localStorage.setItem('expiry', res.headers.get('expiry'))
        localStorage.setItem('tokenType', res.headers.get('token-type'))
        localStorage.setItem('uid', res.headers.get('uid'))

        this.getCurrentProfessor();
      },
      err => console.log(err)
    );
  }

  submit(){
    this.updatingProfile = true;
    this._tokenService.put('professors', this.profileForm.value).subscribe(
      res => {
        this.profileUpdated = true
      },
      err => console.log(err)
    )
  }

}
