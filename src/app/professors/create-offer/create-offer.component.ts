import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  currentUser: any;
  professorCityId: number;
  offerForm: FormGroup;
  closeResult: string;
  modalReference: any;
  faculty_id: any;
  course_id: any;
  subject_id: any;
  course: any;
  subjectsRes: object[];
  faculties: object[];
  courses: object[];
  newSubject: any;
  newFaculty: any;
  newCourse: any;
  offerTypes: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private _tokenService: Angular2TokenService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this._tokenService.validateToken().subscribe(
      (res) => {
        this.currentUser = this._tokenService.currentUserData
        this.professorCityId = this.currentUser.city_id;
        this.getFaculties(this.professorCityId);
        this.getOfferTypes();
      }
    )
  }

  getFaculties(city_id){
    this._tokenService.get('cities/' + city_id + '/faculties').subscribe(
      (res) => {
        this.faculties = res.json();
      },
      (err) => {
      }
    )
  }

  getOfferTypes(){
    this._tokenService.get('offer-types').subscribe(
      (res) => {
        this.offerTypes = res.json();
      },
      (err) => {
      }
    )}

  onFacultyChange(){
    this._tokenService.get('faculties/' + this.newFaculty.id + '/courses').subscribe(
      (res) => {
        this.courses = res.json();
      },
      (err) => console.log(err)
    )
  }

  onCourseChange(course_id){
    this._tokenService.get('courses/' + course_id + '/subjects').subscribe(
      (res) => {
        this.subjectsRes = res.json();
      },
      (err) => console.log(err)
    )
  }

  createForm(){
    this.offerForm = this.fb.group({
      professor_id: '',
      title: '',
      description: '',
      number_of_sessions: '',
      user_place: false,
      professor_place: true,
      offer_type_id: '1',
      prices: this.fb.array([ this.createPrice() ]),
      subjects: this.fb.array([])
    });
  }

  createPrice(): FormGroup {
    return this.fb.group({
      student_count: '',
      price: ''
    })
  }

  addPrice(){
    let prices = this.offerForm.get('prices') as FormArray;
    prices.push(this.createPrice());
  }

  removePrice(i){
    let prices = this.offerForm.get('prices') as FormArray;
    prices.removeAt(i);
  }

  createSubject(): FormGroup {
    return this.fb.group({
      subject_id: '',
      title: ''
    })
  }

  addSubject(sub){
    let subjects = this.offerForm.get('subjects') as FormArray;
    subjects.push(
      this.fb.group({
        subject_id: this.newSubject.id,
        title: this.newSubject.title,
        faculty_id: this.newFaculty.id,
        faculty_title: this.newFaculty.name,
        course_id: this.newCourse.id,
        course_title: this.newCourse.title
      })
    );
    this.modalReference.close('Click');
  }

  removeSubject(i){
    let subjects = this.offerForm.get('subjects') as FormArray;
    subjects.removeAt(i);
  }

  open(content) {
   this.modalReference = this.modalService.open(content);
   this.modalReference.result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }

 submitOffer(){
   this._tokenService.post('professor/offers', this.offerForm.value).subscribe(
     (res) => {
       this.router.navigateByUrl('/offers');
     },
     (err) => {
       console.log(err)
     }
   )
 }

 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return  `with: ${reason}`;
   }
 }
}
