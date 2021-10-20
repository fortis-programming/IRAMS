import { Component, OnInit } from '@angular/core';
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
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    return;
  }

  getTitle(): string {
    return this.headerService.getTitle();
  }

}
