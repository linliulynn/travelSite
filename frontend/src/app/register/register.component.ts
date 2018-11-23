import { Component, OnInit } from '@angular/core';
// import { RegisterForm } from '../models/register-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../shared/password.validator';
import { RegisterService } from './register.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  url = 'http://localhost:8000/travel/users/';

  constructor(private fb: FormBuilder,
              private registerService: RegisterService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['']
    }, {
      validator: PasswordValidation.MatchPassword
    });

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm);
    this.registerService
    .register(this.registerForm)
    .subscribe(
      data => {
        this.alertService.success('Success');

      },
      error => {
        this.alertService.error('Register failed');
      }
    );
  }
  // TODO: Remove this when finished
  get diagnostic() { return JSON.stringify(this.registerForm); }
}
