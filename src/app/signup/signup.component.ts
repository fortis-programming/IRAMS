import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SignupRequest } from '../_shared/models/requests/signup.request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('signupForm') form: NgForm | undefined;
  
  signupModel: SignupRequest = {
    email: '',
    password: '',
    confirmPassword: '',
    studentId: ''
  }
  constructor() { }

  ngOnInit(): void {
    return;
  }
  
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
}
