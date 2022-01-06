import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { ProjectModel } from 'src/app/_shared/models/project.model';
import { HeaderService } from '../../main/header/header.service';
import { WorksService } from '../../services/works.service';
import { WorksModel } from '../../_shared/models/works.model';

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
    private respositoryService: RepositoryService
  ) { }
  
  userEmail = '';
  yourRepositories: WorksModel[] = [];

  ngOnInit(): void {
    this.userEmail = (JSON.parse(JSON.stringify(sessionStorage.getItem('_uid'))));
    this.headerService.setTitle('Repositories');
    this.respositoryService.getYourProjects().then(() => {
      this.yourRepositories = this.respositoryService.databaseUpdate;
    });
  }
  
  getLoadingStatus(): boolean {
    return this.respositoryService.loading;
  }
  
  //  TO CHECK IF INPUT HAS AN ERROR
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
  
  //  CREATE PROJECT 
  processing = false;
  createProject(): void {
    this.processing = true;
    this.projectModel.members.push(this.userEmail);
    this.worksService.createProject(this.projectModel).then(() => {
      this.processing = false;
    });
  }
}