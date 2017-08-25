import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  id: number;
  offers: object[];

  constructor(private http: Http, private tokenService: Angular2TokenService) {
    this.tokenService.validateToken().subscribe(
      (response) => {
        this.id = this.tokenService.currentUserData.id;
        this.getOffers();
      }
    )
  }

  ngOnInit() {
  }

  getOffers(){
    this.http.get('http://localhost:3000/professors/' + this.id + '/offers').subscribe(
      (response) => this.offers = response.json(),
      (error) => console.log(error)
    )
  }

  onDelete(offer_id: number){
    this.http.delete('http://localhost:3000/professors/' + this.id + '/offers/' + offer_id).subscribe(
      (response) => this.getOffers(),
      (error) => console.log(error)
    );
  }
}
