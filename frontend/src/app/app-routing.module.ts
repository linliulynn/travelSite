import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'signin', component: SigninComponent}
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
