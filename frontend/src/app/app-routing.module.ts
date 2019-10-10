import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'login', component: SigninComponent},
  {path: 'signup', component: RegisterComponent},
  {path: '', redirectTo: '/chat', pathMatch: 'full'}
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
