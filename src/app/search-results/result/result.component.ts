import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from '../../services/search-results.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  offer: Offer;
  googleMap: string;
  googleMapApiKey = 'AIzaSyBQYYLV9u6M3InYialwkWDAwBcMMkyCdPA';
  address: string;
  constructor(private searchResultsService: SearchResultsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.searchResultsService.showOffer(params.get('id')))
    .subscribe(
      (response) => {
        this.offer = response.json();
        this.generateMap(this.offer[0].name + ' ' + this.offer[0].address);
      },
      (error) => console.log(error)
    );
  }

  generateMap(address: string){
    this.address = encodeURIComponent(address);
    this.googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center=' + this.address + '&zoom=15&size=600x300&maptype=roadmap \
                      &markers=color:red%7Clabel:C%7C' + this.address + ' \
                      &key=' + this.googleMapApiKey;
  }


}
