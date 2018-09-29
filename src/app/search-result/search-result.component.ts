import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  offerId: any;
  offer: any;

  constructor(private _tokenService: Angular2TokenService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.offerId = +params['offerId']; // (+) converts string 'id' to a number
       this.search(this.offerId);
    });
  }

  search(offerId){
    this._tokenService.get('offers/' + offerId).subscribe(
      (res) => {
        this.offer = res.json();
        console.log(this.offer);
      },
      (err) => console.log(err)
    )
  }

}
