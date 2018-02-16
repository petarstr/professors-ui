import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prof-login',
  templateUrl: './prof-login.component.html',
  styleUrls: ['./prof-login.component.css'],
  providers: [NgbTabsetConfig]
})
export class ProfLoginComponent implements OnInit {

  constructor(config: NgbTabsetConfig) {
    config.justify = 'justified';
  }

  ngOnInit() {
  }

}
