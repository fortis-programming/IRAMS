import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorksService } from 'src/app/services/works.service';
import { WorksModel } from 'src/app/_shared/models/works.model';

@Component({
  selector: 'app-work-preview',
  templateUrl: './work-preview.component.html',
  styleUrls: ['./work-preview.component.scss']
})
export class WorkPreviewComponent implements OnInit {
  repositoryData: WorksModel[] = [];
  repositoryId = '';
  
  constructor(
    private router: Router,
    private workService: WorksService,
    private routeParams: ActivatedRoute
  ) { }
    
  ngOnInit(): void {
    this.routeParams.params.subscribe(params => {
      this.repositoryId = params['id']
    });
    this.getRepositoryData();
  }

  //  RETRIEVE REPOSITORY DATA
  getRepositoryData(): void {
    this.workService.getWorks().subscribe((response) => {
      this.repositoryData = response.data.filter((work: WorksModel) => work.projectId.includes(this.repositoryId));
    });
  }

  //  REROUTE TO PREVIEW PAGE
  closeRepository(): void {
    this.router.navigate(['../app/repositories/works'])
  }
}
