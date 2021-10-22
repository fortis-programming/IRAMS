import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    return;
  }

  getTitle(): string {
    return this.headerService.getTitle();
  }
  
  logout(): void {
    this.router.navigate(['/login']);
  }
}

