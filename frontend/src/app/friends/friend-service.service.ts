import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendService {
  private getFriendUrl = 'http://localhost:8000/travel/friends/1/';

  constructor(private http: HttpClient) { }

  getFriend() {
    return this.http.get(this.getFriendUrl);
  }
}
