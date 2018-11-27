import { Injectable } from '@angular/core';
import {SigninForm} from '../models/sign-in-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { locationStrategy } from '@uirouter/angular';

@Injectable()
export class SigninService {
  private header = new HttpHeaders().set('Content-Type', 'application/json');
  private loginUrl = 'http://localhost:8000/travel/users/login/';

  constructor(private http: HttpClient) { }
  login(form: SigninForm) {
    const body = JSON.stringify({
      username: form.name,
      email: form.email,
      password: form.password
    });
    console.log(body);
    return this.http
           .post<SigninForm>(this.loginUrl, body, {headers: this.header})
           .map(this.handleData.bind(this));
  }

  private handleData(response: Response) {
    const body = response;
    if (body) {
      localStorage.setItem('currentUser', JSON.stringify(body));
      return body;
    }
  }

}
