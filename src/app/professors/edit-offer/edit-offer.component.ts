import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Angular2TokenService } from 'angular2-token';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
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
  offerId: number;
  private sub: any;
  offer: any;
  loaded = false;
  offerTypes: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private _tokenService: Angular2TokenService, private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.offerId = +params['offerId']; // (+) converts string 'id' to a number
    });
    this._tokenService.validateToken().subscribe(
      (res) => {
        this.currentUser = this._tokenService.currentUserData
        this.professorCityId = this.currentUser.city_id;
        this.getOffer();
        this.getFaculties(this.professorCityId);
        this.getOfferTypes();
      }
    )
  }

  getOffer(){
    this._tokenService.get('professor/offers/' + this.offerId).subscribe(
      (res) => {
        this.setFormData(res.json());
        console.log(res.json());
      },
      (err) => {
        console.log(err)
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
  }

  setFormData(data){
    this.offerForm.patchValue({
      professor_id: this.currentUser.id,
      title: data.title,
      description: data.description,
      number_of_sessions: data.number_of_sessions,
      user_place: data.user_place,
      professor_place: data.professor_place,
      offer_type_id: data.offer_type_id
    });
    this.setPrices(data);
    this.offerForm.setControl('subjects', this.fb.array(data.subjects));
  }

  setPrices(data){
    let prices = data.prices;
    const pricesFGs = prices.map(price => this.fb.group(price));
    const pricesFormArray = this.fb.array(pricesFGs);
    this.offerForm.setControl('prices', pricesFormArray);
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

  onFacultyChange(faculty_id){
    this._tokenService.get('faculties/' + faculty_id + '/courses').subscribe(
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
      user_place: '',
      professor_place: '',
      offer_type_id: '',
      prices: this.fb.array([this.createPrice()]),
      subjects: this.fb.array([])
    });
  }

  createPrice(): FormGroup {
    return this.fb.group({
      student_count: 0,
      price: 0
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
        id: this.newSubject.id,
        title: this.newSubject.title,
        course: {
          id: this.newCourse.id,
          title: this.newCourse.title,
          faculty: {
            id: this.newFaculty.id,
            name: this.newFaculty.name
          }
        }
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
   this._tokenService.put('professors/' + this.currentUser.id + '/offers/' + this.offerId, this.offerForm.value).subscribe(
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
