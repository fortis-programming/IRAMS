import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { WorksService } from 'src/app/services/works.service';
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
    members: [],
    validator: '',
    college: '',
    metaData: '',
    contributors: []
  }
  
  @Input() workId: string = '';
  
  members: Array<string> = [];
  
  constructor(
    private router: Router,
    private workService: WorksService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getDisplayName();
  }
  
  //  OPEN A REPOSITORY PROJECT
  openRepository(repositoryId: string): void {
    this.router.navigate(['../app/repositories/preview', repositoryId]);
  }
  
  getDisplayName(): void {
    this.members = this.userService.getUsersMetaData(JSON.parse(JSON.stringify(this.workItem.members)));
  }
  
  getMembers(): string {
    return this.members.join(', ');
  }
}
