import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  yourRepositories: WorksModel[] = [];
  documentIds: Array<string> = [];
  
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
    private worksService: WorksService
  ) { }

  ngOnInit(): void {
    let userEmail = (JSON.parse(JSON.stringify(sessionStorage.getItem('_name'))))
    this.headerService.setTitle('Repositories');
    this.worksService.realTimeUpdate();
    this.worksService.getDatabaseUpdate().then((data) => {
      this.yourRepositories = data;
    }).catch((error) => {
      console.log(error)
    })
    this.projectModel.members.push(userEmail)
  }
  
  getLoadingStatus(): boolean {
    return this.worksService.loading;
  }
  
  //  TO CHECK IF INPUT HAS AN ERROR
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
  
  //  CREATE PROJECT 
  processing = false;
  createProject(): void {
    this.processing = true;
    this.worksService.createProject(this.projectModel).then(() => {
      this.processing = false;
    })
  }
  
  type = 'Developmental';
  selectProjectType(type: string): void {
    
  }
}