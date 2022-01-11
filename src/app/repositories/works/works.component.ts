import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from 'src/app/main/header/header.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { WorksService } from 'src/app/services/works.service';

import { ProjectModel } from 'src/app/_shared/models/project.model';
import { WorksModel } from 'src/app/_shared/models/works.model';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  projectModel: ProjectModel = {
    title: '',
    type: 'Developmental',
    college: 'CIT',
    members: [],
    status: 'Ongoing',
    projectId: ''
  }
  
  constructor(
    private headerService: HeaderService,
    private worksService: WorksService,
    private repositoryService: RepositoryService
  ) { }

  userEmail = '';
  yourRepositories: WorksModel[] = [];

  ngOnInit(): void {
    this.userEmail = (JSON.parse(JSON.stringify(sessionStorage.getItem('_uid'))));
    this.headerService.setTitle('Repositories');
    this.yourRepositories = [];
  }

  loading = false;
  empty = false;
  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this.yourRepositories = [];
    this.repositoryService.getWorks().then((data) => {
      this.yourRepositories = data;
    });
  }
  
  // getLoadingStatus(): boolean {
  //   return this.repositoryService.loading;
  // }
  
  //  CREATE PROJECT 
  processing = false;
  createProject(): void {
    this.processing = true;
    this.projectModel.members.push(this.userEmail);
    this.worksService.createProject(this.projectModel).then(() => {
      this.processing = false;
    });
  }

  //  TO CHECK IF INPUT HAS AN ERROR
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
}
