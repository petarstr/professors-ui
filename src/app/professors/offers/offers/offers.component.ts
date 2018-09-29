import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  currentProfessorId: number;
  offers: any;

  constructor(private _tokenService: Angular2TokenService) {
  }

  ngOnInit() {
    this._tokenService.validateToken().subscribe(
      res => {
        this.currentProfessorId = res.json().data.id;
        this.getOffers();
      }
    )
  }

  getOffers(){
    this._tokenService.get('professor/offers').subscribe(
      res => {
        console.log(res.json());
        this.offers = res.json();
      },
      err => {
        console.log(err);
      }
    )
  }

  changeOfferState(offerId, state){
    var body = { 'active': !state }
    this._tokenService.put('professors/' + this.currentProfessorId + '/offers/' + offerId, body).subscribe(
      res => {
        var obj = this.offers.find(function (offer) { return offer.id === offerId; });
        obj.active = !state;
      },
      err => {
        console.log(err);
      }
    )
  }

  removeOffer(offerId){
    this._tokenService.delete('professor/offers/' + offerId).subscribe(
      res => {
        var obj = this.offers.find(function (offer) { return offer.id === offerId; });
        this.offers.splice(this.offers.indexOf(obj), 1);
      },
      err => {
        console.log(err);
      }
    )
  }

}
