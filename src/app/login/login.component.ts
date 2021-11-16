import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { LoginRequest } from '../_shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form: NgForm | undefined;
  loginMessage = '';
  loginModel: LoginRequest = {
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    return;
  }

  //  TO CHECK IF NGMODEL INPUT OR FORM IS VALID OR HAS ERROR
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
  
  //  LOGIN WITH SIGN-IN POPUP FROM GOOGLE
  loginWithGoogle(): void {
    this.authService.loginWithPopup();
  }
  
  // LOGOUT USER
  logoutUser(): void {
    this.authService.logout();
  }
  
  //  SIGN IN WITH LOGIN FORM
  async signInWithCredentials(): Promise<void> {
    let response = await this.authService.loginWithCredentials(this.loginModel.email, this.loginModel.password);
    (response)? this.route.navigate(['/app']) : this.loginMessage = 'Incorrect username or password';
  }
}
