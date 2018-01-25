import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  url : string = 'http://localhost:8000/travel/users';
  
  constructor(private http : HttpClient){}
  
  public getUsers() {
    this.http.get(this.url).subscribe((res)=>{
      console.log(res);
    });
  }
}
