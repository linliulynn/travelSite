import { Component, OnInit } from '@angular/core';
import { SigninForm } from '../models/sign-in-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private signinForm: SigninForm;
  submitted = false;
  url : string = 'http://localhost:8000/travel/users/login/';
  
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.signinForm = new SigninForm("","","");
  }

  onSubmit(form : SigninForm) { 
    this.submitted = true;
    console.log(form);
    let body = JSON.stringify({
      username: form.name,
      email: form.email,
      password: form.password
    });
    console.log(body);
    this.http.post<SigninForm>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(
      (res)=>{ console.log(res);
    }); 
  }

}
