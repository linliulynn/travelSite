import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../models/register-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../shared/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  url = 'http://localhost:8000/travel/users/';

  constructor(private http: HttpClient, private fb: FormBuilder) {}

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

  onSubmit(form: RegisterForm) {
    this.submitted = true;
    console.log(form);
    const body = JSON.stringify({
      username: form.name,
      email: form.email,
      password: form.password
    });
    console.log(body);
    this.http.post<RegisterForm>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(
      (res) => { console.log(res);
    });
  }
  // TODO: Remove this when finished
  get diagnostic() { return JSON.stringify(this.registerForm); }
}
