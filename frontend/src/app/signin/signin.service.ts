import { Injectable } from '@angular/core';
import {SigninForm} from '../models/sign-in-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SigninService {
  private header = new HttpHeaders().set('Content-Type', 'application/json');
  private loginUrl : string = 'http://localhost:8000/travel/users/login/';

  constructor(private http : HttpClient) { }
  
  login(form : SigninForm) { 
    let body = JSON.stringify({
      username: form.name,
      email: form.email,
      password: form.password
    });
    console.log(body);
    return this.http
           .post<SigninForm>(this.loginUrl, body, {headers: this.header,})
           .map(this.handleData.bind(this)); 
  }

  private handleData(response: Response) {
    let body = response;
    if (body) {
      localStorage.setItem('currentUser', JSON.stringify(body));
      return body;
    };
  }

}
