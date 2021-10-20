import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  constructor() { }

  ngOnInit(): void {
    return;
  }
  
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
  
}
