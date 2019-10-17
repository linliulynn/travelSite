import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendServiceService {
  private getFriendUrl = 'http://localhost:8000/friends.json';

  constructor(private http: HttpClient) { }

  getFriend() {
    return this.http.get(this.getFriendUrl);
  }
}
