import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { SigninService} from './signin/signin.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { LocationComponent } from './location/location.component';
import { AddJourneyComponent } from './add-journey/add-journey.component';
import { AddJourneyService } from './add-journey/add-journey.service';
import { JourneyComponent } from './journey/journey.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent}
]

@NgModule({
  declarations: [
    LocationComponent,
    AppComponent,
    RegisterComponent,
    SigninComponent,
    AlertComponent,
    AddJourneyComponent,
    JourneyComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "",
      libraries: ["places"]
    }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    SigninService,
    AlertService,
    AddJourneyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
