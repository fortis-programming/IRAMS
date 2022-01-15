import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
    college: 'PIE',
    members: [],
    status: 'Ongoing',
    projectId: ''
  }
  
  constructor(
    private headerService: HeaderService,
    private worksService: WorksService,
    private repositoryService: RepositoryService,
    private router: Router
  ) { }

  userEmail = '';
  yourRepositories: WorksModel[] = [];

  ngOnInit(): void {
    this.userEmail = (JSON.parse(JSON.stringify(sessionStorage.getItem('_uid'))));
    this.headerService.setTitle('Repositories');
    this.yourRepositories = [];
  }

  loading = true;
  empty = true;
  ngAfterViewInit(): void {
    this.fetchData();
  }

  public refreshComponent(): void {
    console.log(this.yourRepositories.length);
    location.reload();
  }

  fetchData(): void {
    this.loading = true;
    this.repositoryService.getWorks().then((data) => {
      this.yourRepositories.splice(0, this.yourRepositories.length);
      this.yourRepositories = data;
      setTimeout(() => {
        this.loading = false;
        (this.yourRepositories.length === 0) ? this.empty = true : this.empty = false;
      }, 2000);
    });
  }
  
  // getLoadingStatus(): boolean {
  //   return this.repositoryService.loading;
  // }
  
  //  CREATE PROJECT 
  processing = false;
  createProject(): void {
    this.yourRepositories = [];
    this.processing = true;
    this.loading = true;
    this.projectModel.members.push(this.userEmail);
    this.worksService.createProject(this.projectModel).then(() => {
      this.processing = false;
      this.refreshComponent();
      // this.fetchData();
    });
  }

  //  TO CHECK IF INPUT HAS AN ERROR
  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
}
