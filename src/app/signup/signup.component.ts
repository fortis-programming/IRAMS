import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';

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
    studentId: '',
    name: ''
  }
  constructor(
    private signupService: SignUpService,
    private route: Router
  ) { }

  ngOnInit(): void {
    return;
  }

  //  TO CHECK IF INPUT HAS AN ERROR
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
  
  createYourAccount(): void {
    this.signupService.createAccount(this.signupModel).then(() => {
      this.route.navigate(['login']);
    })
  }
}
