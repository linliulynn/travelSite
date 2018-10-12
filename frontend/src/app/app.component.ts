import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {UIRouterModule} from '@uirouter/angular';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  url = 'http://localhost:8000/travel/users.json';
  constructor(private http: HttpClient) {}
  public getUsers() {
    this.http.get(this.url).subscribe((res) => {
      console.log(res);
    });
  }
}
