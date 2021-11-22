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
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
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
}

