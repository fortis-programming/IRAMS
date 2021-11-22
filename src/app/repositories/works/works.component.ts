import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderService } from '../../main/header/header.service';
import { WorksService } from '../../services/works.service';
import { WorksModel } from '../../_shared/models/works.model';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  yourRepositories: WorksModel[] = [];
  documentIds: Array<string> = [];

  constructor(
    private headerService: HeaderService,
    private worksService: WorksService
  ) { }

  ngOnInit(): void {
    let userEmail = (JSON.parse(JSON.stringify(sessionStorage.getItem('_name'))))
    this.headerService.setTitle('Repositories');
    this.worksService.realTimeUpdate();
    this.yourRepositories = this.worksService.getDatabaseUpdate();
  }
}