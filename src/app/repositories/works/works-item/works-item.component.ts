import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';
import { UsersModel } from 'src/app/_shared/models/users.model';
import { WorksModel } from 'src/app/_shared/models/works.model';

@Component({
  selector: 'app-works-item',
  templateUrl: './works-item.component.html',
  styleUrls: ['./works-item.component.scss']
})
export class WorksItemComponent implements OnInit {
  @Input() workItem: WorksModel = {
    title: '',
    projectId: '',
    type: '',
    status: '',
    updatedAt: '',
    members: [],
    validator: '',
    college: '',
    metaData: ''
  }
  
  @Input() workId: string = '';
  
  constructor(
    private router: Router,
    private repositoryService: RepositoryService
  ) { }

  members: UsersModel[] = [];
  ngOnInit(): void {
    this.repositoryService.getUsers(this.workItem.members).then((data) => {
        this.members = data;
      });
  }

  ngAfterViewInit(): void {
    // this.repositoryService.getUsers(this.workItem.members).then((data) => {
    //   this.members = data;
    // });
    // this.workItem.members.forEach(uid => {
    //   this.repositoryService.getUsers(uid).then((data) => {
    //     this.members = data;
    //   });
    // });
  }
  
  //  OPEN A REPOSITORY PROJECT
  openRepository(): void {
    this.router.navigate(['../app/repositories/preview', this.workItem.projectId]);
  }
  
  getMembers(): number {
    return this.workItem.members.length;
  }
}
