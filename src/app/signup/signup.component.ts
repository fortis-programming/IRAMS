import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    return;
  }

  checked = false;
  check(): void {
    (this.checked)? this.checked = false : this.checked = true;
  }
  //  TO CHECK IF INPUT HAS AN ERROR
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
  
  createYourAccount(): void {
    this.signupService.createAccount(this.signupModel).then((response) => {
      if(!response) {
        this.toastr.error('Failed to create your account try again')
      }
      
      this.toastr.success('Account was successfully created')
      setTimeout(() => {
        this.route.navigate(['login']);
      }, 1000);
    })
  }
}
