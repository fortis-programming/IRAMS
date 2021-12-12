import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/main/header/header.service';
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
    private router: Router
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
    this.userId = JSON.parse(JSON.stringify(sessionStorage.getItem('_name')));
    this.userService.getUserMetaData([this.userId]).then((data) => {
      this.user = [JSON.parse(JSON.stringify(data))][0];
      this.loading = false;
    });
  }
  
  closeAccountSettings(): void {
    this.router.navigate(['../app/explore']);
  }
  
  changesSaved = false;
  saveAccountChanges(): void {
    this.userService.saveAccountChanges(this.user);
    this.changesSaved = false;
  }

}
