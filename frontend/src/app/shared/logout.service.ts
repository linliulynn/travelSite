import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

  constructor(private router: Router) { }
  logOut () {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
