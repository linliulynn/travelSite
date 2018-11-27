import { Component, OnInit } from '@angular/core';
import { SigninForm } from '../models/sign-in-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SigninService} from './signin.service';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  private signinForm: SigninForm;
  submitted = false;
  constructor(private signinService: SigninService,
              private alertService: AlertService,
              private router: Router,
            ) { }

  ngOnInit() {
    this.signinForm = new SigninForm('', '', '');
  }

  onSubmit(form: SigninForm) {
    this.submitted = true;
    console.log(form);
    this.signinService
    .login(form)
    .subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.alertService.error('please check your email, user name and password');
      });
  }

}
