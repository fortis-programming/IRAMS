import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../main/header/header.service';
import { WorksService } from '../services/works.service';
import { WorksModel } from '../_shared/models/works.model';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  yourRepositories: WorksModel[] = [];
  constructor(
    private headerService: HeaderService,
    private worksService: WorksService
  ) { }

  ngOnInit(): void {
    this.headerService.setTitle('Repositories');
    this.worksService.getWorks().subscribe((response) => {
      this.yourRepositories = response.data;
    });
  }

}
