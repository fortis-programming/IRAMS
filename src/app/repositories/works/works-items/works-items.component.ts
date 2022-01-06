import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';
import { UsersService } from 'src/app/services/users.service';
import { WorksModel } from 'src/app/_shared/models/works.model';

@Component({
  selector: 'app-works-items',
  templateUrl: './works-items.component.html',
  styleUrls: ['./works-items.component.scss']
})
export class WorksItemsComponent implements OnInit {
  @Input() workItem: WorksModel = {
    projectId: '',
    title: '',
    type: '',
    updatedAt: '',
    status: '',
    validator: '',
    college: '',
    metaData: '',
    members: []
  }

  members: Array<string> = [];
  @Input() workId: string = '';
  
  constructor(
    private router: Router,
    private repositoryService: RepositoryService
  ) { }

  ngOnInit(): void {
    this.workItem.members.forEach(uid => {
      this.repositoryService.getUserName(uid).then((data) => {
        this.members = this.repositoryService.names;
      });
    })
  }
  
  //  OPEN A REPOSITORY PROJECT
  openRepository(repositoryId: string): void {
    this.router.navigate(['../app/repositories/preview', repositoryId]);
  }
  
  getMembers(): string {
    return this.members.join(', ');
  }
}
