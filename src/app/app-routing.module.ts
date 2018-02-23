import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { UserLoginComponent } from './login/user-login/user-login.component';
import { Angular2TokenService } from 'angular2-token';
import { UserRegistrationComponent } from './register/user-registration/user-registration.component';
import { ProfessorRegistrationComponent } from './register/professor-registration/professor-registration.component';
import { ProfessorLoginComponent } from './login/professor-login/professor-login.component';
import { CreateOfferComponent } from './professors/create-offer/create-offer.component';
import { SearchComponent } from './search/search.component';
import { ProfLoginComponent } from './professors/prof-login/prof-login.component';
import { AdminComponent } from './professors/admin/admin.component';
import { EditOfferComponent } from './professors/edit-offer/edit-offer.component';

const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'users/login', component: UserLoginComponent },
  { path: 'users/sign-up', component: UserRegistrationComponent },
  { path: 'professors/login', component: ProfLoginComponent },
  {
    path: 'professors/:username',
    component: AdminComponent,
    canActivate: [Angular2TokenService]
  },
  {
    path: 'offers/new',
    component: CreateOfferComponent,
    canActivate: [Angular2TokenService]
  },
  {
    path: 'offers/:offerId/edit',
    component: EditOfferComponent,
    canActivate: [Angular2TokenService]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
