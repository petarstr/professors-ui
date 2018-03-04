import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  offers: any;
  subjectId: any;
  
  constructor(private _tokenService: Angular2TokenService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.subjectId = +params['subjectId']; // (+) converts string 'id' to a number
       this.search(this.subjectId);
    });
  }

  search(subjectId){
    this._tokenService.get('search/' + subjectId).subscribe(
      (res) => {
        this.offers = res.json();
        console.log(this.offers);
      },
      (err) => console.log(err)
    )
  }

}
