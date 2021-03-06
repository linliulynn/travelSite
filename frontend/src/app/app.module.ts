import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { SigninService} from './signin/signin.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { RegisterService } from './register/register.service';
import { LocationComponent } from './location/location.component';
import { AddJourneyComponent } from './add-journey/add-journey.component';
import { AddJourneyService } from './add-journey/add-journey.service';
import { JourneyComponent } from './journey/journey.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutService } from './shared/logout.service';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { FriendsComponent } from './friends/friends.component';
import { FriendService } from './friends/friend-service.service';


@NgModule({
  declarations: [
    LocationComponent,
    AppComponent,
    RegisterComponent,
    SigninComponent,
    AlertComponent,
    AddJourneyComponent,
    JourneyComponent,
    NavbarComponent,
    ChatComponent,
    FriendsComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    SigninService,
    AlertService,
    AddJourneyService,
    RegisterService,
    LogoutService,
    ChatService,
    FriendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
