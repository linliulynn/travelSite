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
