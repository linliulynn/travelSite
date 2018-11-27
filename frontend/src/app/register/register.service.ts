import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegisterService {
  url = 'http://localhost:8000/travel/users/';

  constructor(private http: HttpClient) { }
  register(form: FormGroup) {
    const body = JSON.stringify({
      username: form.value.name,
      email: form.value.email,
      password: form.value.password
    });
    return this.http.post<FormGroup>(this.url, body, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    });
  }

}
