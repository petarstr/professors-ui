import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from '../services/search-results.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResults: object[];
  constructor(private searchResultsService: SearchResultsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.searchResultsService.getSearchOffer(params.get('city_id'), params.get('faculty_id'), params.get('course_id'), params.get('subject_id')))
    .subscribe(
      (response) => {
        this.searchResults = response.json();
        console.log(this.searchResults);
      },
      (error) => console.log(error)
    );
  }

}
