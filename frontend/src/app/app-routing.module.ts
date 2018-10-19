import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { JourneyComponent } from './journey/journey.component';
import { AddJourneyComponent } from './add-journey/add-journey.component';

const appRoutes: Routes = [
  {path: 'journey', component: JourneyComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'addJourney', component: AddJourneyComponent},
  {path: '', redirectTo: '/journey', pathMatch: 'full'}
];

@NgModule({
  imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true }
      )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
