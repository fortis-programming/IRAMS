import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../main/header/header.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  constructor(
    private headerTitle: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerTitle.setTitle('Repositories')
  }
}
