import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { UserSignupComponent } from './users/user-signup/user-signup.component';
import { UserSigninComponent } from './users/user-signin/user-signin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProfessorSignupComponent } from './professors/professor-signup/professor-signup.component';
import { ProfessorSigninComponent } from './professors/professor-signin/professor-signin.component';
import { ProfileComponent } from './professors/profile/profile.component';
import { ProfGuard } from './guards/prof-guard.service';
import { OffersComponent } from './professors/offers/offers.component';
import { MyOffersComponent } from './professors/my-offers/my-offers.component';
import { ResultComponent } from './search-results/result/result.component';
import { EditOfferComponent } from './professors/offers/edit-offer/edit-offer.component';

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'user/login',
    component: UserSigninComponent
  },
  {
    path: 'user/register',
    component: UserSignupComponent
  },
  {
    path: 'offers/:city_id/:faculty_id/:course_id/:subject_id',
    component: SearchResultsComponent,
    canActivate: []
  },
  {
    path: 'professor/login',
    component: ProfessorSigninComponent
  },
  {
    path: 'professor/register',
    component: ProfessorSignupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [Angular2TokenService, ProfGuard]
  },
  {
    path: 'professor/offer',
    component: OffersComponent,
    canActivate: [Angular2TokenService, ProfGuard]
  },
  {
    path: 'professor/offers',
    component: MyOffersComponent,
    canActivate: [Angular2TokenService, ProfGuard]
  },
  {
    path: 'offer/:id',
    component: ResultComponent,
    canActivate: [Angular2TokenService]
  },
  {
    path: 'my-offer/:id',
    component: ResultComponent,
    canActivate: [Angular2TokenService, ProfGuard]
  },
  {
    path: 'offer/edit/:id',
    component: EditOfferComponent,
    canActivate: [Angular2TokenService, ProfGuard]
  },
  {
    path: '**',
    redirectTo: '/welcome'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
