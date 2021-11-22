import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }
  
  /*
    TO CHECK IF USER HAS ALREADY LOGGED IN IF NOT THE USER WILL BE REROUTED TO LOGIN PAGE
  */
  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;      
    }
    return true;
  }
}
