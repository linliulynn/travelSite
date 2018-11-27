import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../models/register-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: RegisterForm;
  submitted = false;
  url = 'http://localhost:8000/travel/users/';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.registerForm = new RegisterForm('', '', '', '');
  }

  onSubmit(form: RegisterForm) {
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
