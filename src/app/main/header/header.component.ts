import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Title';
  query = '';

  constructor(
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router
  ) { }

  photo = '';
  name = '';
  ngOnInit(): void {
    this.photo = ((JSON.parse(JSON.stringify(sessionStorage.getItem('photo'))) == ''))? JSON.parse(JSON.stringify(sessionStorage.getItem('photo'))) : '../../assets/images/user.png'; 
    this.name = JSON.parse(JSON.stringify(sessionStorage.getItem('_uid')))
    return;
  }

  getTitle(): string {
    return this.headerService.getTitle();
  }

  logout(): void {
    this.authService.logout();
  }
  
  //  CHECK AUTHENTICATION
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  
  routeToAccountSettings(): void {
    this.router.navigate(['../app/account-settings']);
  }
}

