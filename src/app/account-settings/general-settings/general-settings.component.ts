import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { HeaderService } from 'src/app/main/header/header.service';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { UsersService } from 'src/app/services/users.service';
import { AccountModel } from 'src/app/_shared/models/account.model';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  userId = '';
  constructor(
    private headerService: HeaderService,
    private userService: UsersService,
    private router: Router,
    private auth: AuthService
  ) { }
  
  user: AccountModel = {
    displayName: '',
    studentId: '',
    name: '',
    email: '',
    photoUrl: ''
  }
  
  loading = true;
  ngOnInit(): void {
    this.headerService.setTitle('Account settings');
    this.userId = JSON.parse(JSON.stringify(sessionStorage.getItem('_uid')));
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.userService.getUserMetaData([this.userId]).then((data) => {
      this.user = JSON.parse(JSON.stringify(data));
      this.loading = false;
    }); 
  }

  message = 'Confirm';
  oldPassword = '';
  password = '';
  confirmPassword = '';
  changePassword(): void {
    this.auth.updateUserPassword(this.oldPassword, this.password).then(() => {
      this.message = 'Success!';
      setTimeout(() => {
        this.message = '';
        this.oldPassword = '';
        this.confirmPassword = '';
        this.password = '';
      }, 3000);
    })
  }
  
  closeAccountSettings(): void {
    this.router.navigate(['../app/explore']);
  }
  
  changesSaved = false;
  saveAccountChanges(): void {
    this.userService.saveAccountChanges(this.user);
    this.changesSaved = false;
    this.getData();
  }
}
