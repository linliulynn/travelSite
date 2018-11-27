import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: '';

  constructor() { }

  ngOnInit() {
  }

  isSignedIn() {
    if (localStorage.getItem('currentUser')) {
      this.username = JSON.parse(localStorage.getItem('currentUser')).username;
      return true;
    } else {
      return false;
    }
  }

}
