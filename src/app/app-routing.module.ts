import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './components/home/home.component';
import { AppoinmentsComponent } from './components/appoinments/appoinments.component';



const routes: Routes = [
  { path: '' , component: LandingPageComponent },
  { path: 'home' , component: HomeComponent },
  { path: 'appoinments' , component: AppoinmentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
