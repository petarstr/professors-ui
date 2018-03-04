import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  professorId: number;
  professor: any;
  constructor(private _tokenService: Angular2TokenService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.professorId = +params['professorId']; // (+) converts string 'id' to a number
       this.getProfessor(this.professorId);
    });
  }

  getProfessor(professorId) {
    this._tokenService.get('professors/' + professorId).subscribe(
      (res) => {
        this.professor = res.json();
        console.log(this.professor);
      },
      (err) => console.log(err)
    )
  }

}
