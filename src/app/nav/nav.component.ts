import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  menuHidden: boolean = false;

  menuItems = [
    {
      page: 'profil',
      name: 'Profil',
      icon: 'icon'
    },
    {
      page: 'offers',
      name: 'Ponude',
      icon: 'icon'
    },
    {
      page: 'offers/new',
      name: 'Kreiraj ponudu',
      icon: 'icon'
    }
  ]

  constructor(private _tokenService: Angular2TokenService, private router: Router) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuHidden = !this.menuHidden;
  }

  signOut(){
    this._tokenService.signOut().subscribe(
      res => {
        this.router.navigateByUrl('/');
      },
      error => console.log(error)
    )
  }


}
