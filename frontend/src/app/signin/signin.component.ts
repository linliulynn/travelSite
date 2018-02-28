import { Component, OnInit } from '@angular/core';
import { SigninForm } from '../models/sign-in-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SigninService} from './signin.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private signinForm: SigninForm;
  submitted = false;
  
  constructor(private signinService : SigninService,
              private alertService : AlertService
            ) { }

  ngOnInit() {
    this.signinForm = new SigninForm("","","");
  }

  onSubmit(form : SigninForm) { 
    this.submitted = true;
    console.log(form); 
    this.signinService
    .login(form)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.alertService.error('please check your email, user name and password');
      });
  }

}
