import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataHelpersService } from '../../../services/data-helpers.service';
import { Angular2TokenService } from 'angular2-token';
import { Http } from '@angular/http';
import { SearchResultsService } from '../../../services/search-results.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Offer } from '../../../models/offer';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  offerForm: FormGroup;
  subjects: object[];
  id: number;
  formSubmitted = false;
  offer: Offer;
  faculties: object[];
  courses: object[];
  offer_id: string;


  constructor(private fb: FormBuilder, private dataHelpersService: DataHelpersService, private route: ActivatedRoute, private router: Router,
              private tokenService: Angular2TokenService, private http: Http, private searchResultsService: SearchResultsService) {

    this.createForm();
    this.initializeOffer();
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.searchResultsService.showOffer(params.get('id'))
    )
    .subscribe(
      (response) => {
        this.setCurrentOfferData(response.json());
      },
      (error) => console.log(error)
    );
  }

  createForm(){
    this.offerForm = this.fb.group({
      title: '',
      description: '',
      number_of_sessions: '',
      user_place: '',
      professor_place: '',
      price: ''
    })
  }

  onSubmit(){
    this.formSubmitted = true;
    if(this.offerForm.status === 'VALID'){
      this.id = this.tokenService.currentUserData.id
      this.editOffer();
    }
  }

  editOffer(){
    this.http.put('http://localhost:3000/professors/' + this.id + '/offers/' + this.offer_id, JSON.stringify(this.offerForm.value)).subscribe(
      (response) => this.router.navigateByUrl('/offer/' + this.offer_id),
      (error) => console.log(error)
    )
  }

  initializeOffer(){
    this.offer = new Offer();
    this.offer.title = '';
    this.offer.description = '';
    this.offer.number_of_sessions = 0;
    this.offer.user_place = true;
    this.offer.professor_place = true;
    this.offer.price = 0;
  }

  setCurrentOfferData(response){
    response = response[0]
    this.offer_id = response.offer_id
    this.offer.title = response.offer_title;
    this.offer.description = response.description;
    this.offer.number_of_sessions = response.number_of_sessions
    this.offer.professor_place = response.professor_place
    this.offer.user_place = response.user_place
    this.offer.price = response.price;
  }
}
