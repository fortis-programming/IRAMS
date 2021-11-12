import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorksModel } from 'src/app/_shared/models/works.model';

import { UsersService } from 'src/app/services/users.service';
import { WorksService } from 'src/app/services/works.service';
import { UsersModel } from 'src/app/_shared/models/users.model';

@Component({
  selector: 'app-work-preview',
  templateUrl: './work-preview.component.html',
  styleUrls: ['./work-preview.component.scss']
})
export class WorkPreviewComponent implements OnInit {
  repositoryData: WorksModel[] = [];
  membersList: Array<string> = [];
  usersList: UsersModel[] = [];
  repositoryId = '';

  constructor(
    private router: Router,
    private routeParams: ActivatedRoute,
    private workService: WorksService,
    private userService: UsersService
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
      this.extractMembers(this.repositoryData[0].members);
    });
  }

  //  EXTRACT AUTHORS
  extractMembers(list: Array<Object>): void {
    list.forEach(member => {
      let data = (Object.values(JSON.parse(JSON.stringify(member)))[0])
      this.membersList.push(JSON.parse(JSON.stringify(data)))
    })
  }

  //  REROUTE TO PREVIEW PAGE
  closeRepository(): void {
    this.router.navigate(['../app/repositories/works'])
  }

  //  GET MEMBERS NAME
  nameQuery = '';
  getMembers(): void {
    this.nameQuery !== '' ? this.getMembersFromDatabase() : this.usersList = [];
  }

  //  PROCESS FROM DATABASE
  getMembersFromDatabase(): void {
    this.userService.getUsersList().subscribe((response) => {
      this.usersList = response.data.filter((users: UsersModel) =>
        (users.name.toLowerCase().includes(this.nameQuery.toLowerCase())));
    });
  }

  //  HIGHLIGHT SELECTED USER
  selected = '';
  selectUser(id: string): void {
    this.selected = id;
  }

  //  ADD SELECTED TO OBJECT/ARRAY
  addSelected(): void {
    (this.membersList.includes(this.selected)) ? console.log() : this.membersList.push(this.selected)
  }
}
