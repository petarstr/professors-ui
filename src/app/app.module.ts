import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Angular2TokenService } from 'angular2-token';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { UserRegistrationComponent } from './register/user-registration/user-registration.component';
import { ProfessorRegistrationComponent } from './register/professor-registration/professor-registration.component';
import { ProfileComponent } from './professors/profile/profile.component';
import { ProfessorLoginComponent } from './login/professor-login/professor-login.component';
import { CreateOfferComponent } from './professors/create-offer/create-offer.component';
import { SearchComponent } from './search/search.component';
import { ProfLoginComponent } from './professors/prof-login/prof-login.component';
import { AdminComponent } from './professors/admin/admin.component';
import { FileUploadService } from './services/file-upload.service';
import { OffersComponent } from './professors/offers/offers/offers.component';
import { OfferCardComponent } from './professors/offers/offer-card/offer-card.component';
import { AddSubjectModalComponent } from './professors/create-offer/add-subject-modal/add-subject-modal.component';
import { EditOfferComponent } from './professors/edit-offer/edit-offer.component';
import { NavComponent } from './nav/nav.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PublicProfileComponent } from './professors/public-profile/public-profile.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    ProfessorRegistrationComponent,
    ProfileComponent,
    ProfessorLoginComponent,
    CreateOfferComponent,
    SearchComponent,
    ProfLoginComponent,
    AdminComponent,
    OffersComponent,
    OfferCardComponent,
    AddSubjectModalComponent,
    EditOfferComponent,
    NavComponent,
    SearchResultsComponent,
    PublicProfileComponent,
    SearchResultComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgbModule.forRoot()
  ],
  providers: [Angular2TokenService, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
