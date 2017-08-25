import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfessorsComponent } from './professors/professors.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './professors/profile/profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProfessorSignupComponent } from './professors/professor-signup/professor-signup.component';
import { UserSignupComponent } from './users/user-signup/user-signup.component';
import { OffersComponent } from './professors/offers/offers.component';
import { UserSignUpService } from './services/user-sign-up.service';
import { UserSigninComponent } from './users/user-signin/user-signin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfessorSigninComponent } from './professors/professor-signin/professor-signin.component';
import { ProfGuard } from './guards/prof-guard.service';
import { HeadingComponent } from './heading/heading.component';
import { DataHelpersService } from './services/data-helpers.service';
import { MyOffersComponent } from './professors/my-offers/my-offers.component';
import { SearchResultsService } from './services/search-results.service';
import { ResultComponent } from './search-results/result/result.component';
import { EditOfferComponent } from './professors/offers/edit-offer/edit-offer.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfessorsComponent,
    UsersComponent,
    ProfileComponent,
    SearchResultsComponent,
    ProfessorSignupComponent,
    UserSignupComponent,
    OffersComponent,
    UserSigninComponent,
    WelcomeComponent,
    ProfessorSigninComponent,
    HeadingComponent,
    MyOffersComponent,
    ResultComponent,
    EditOfferComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserSignUpService, Angular2TokenService, ProfGuard, DataHelpersService, SearchResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
