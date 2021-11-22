import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Editor, Toolbar } from 'ngx-editor';

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

  htmlContent = '';
  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];

  constructor(
    private router: Router,
    private routeParams: ActivatedRoute,
    private workService: WorksService,
    private userService: UsersService,
  ) { }

  title = '';
  ngOnInit(): void {
    this.routeParams.params.subscribe(params => {
      this.repositoryId = params['id']
    });
    this.editor = new Editor();
    this.updateData();
  }

  buttonClicked = false;
  timer: any = ''
  autoSaveDelay(): void {
    if (!this.buttonClicked) {
      this.buttonClicked = true;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.buttonClicked = false;
        clearInterval(this.timer);
        this.onChange();
      }, 5000);
    }
  }

  updateData(): void {
    this.workService.getRepositoryData(this.repositoryId).then(() => {
      this.repositoryData = this.workService.sendRepositoryData();
      this.extractDocument();
      this.extractMembers();
    });
  }

  //  DETECT CHANGES
  onChange(): void {
    this.saveUpdateToDatabase();
  }

  //  EXTRACT AUTHORS
  extractMembers(): void {
    this.repositoryData.map(data => {
      this.membersList = JSON.parse(JSON.stringify(data.members));
    })
  }

  //  EXTRACT DOCUMENT
  extractDocument(): void {
    this.repositoryData.map(data => {
      this.htmlContent = data.data;
      this.title = data.title;
    })
  }

  //  RE-ROUTE TO PREVIEW PAGE
  closeRepository(): void {
    this.saveUpdateToDatabase();
    this.router.navigate(['../app/repositories/works'])
  }

  /*============================================
    D A T A B A S E    I N T E R A C T I O N
  ============================================*/
  //  SAVE UPDATE
  saveUpdateToDatabase(): void {
    this.repositoryData.map(data =>
      data.data = this.htmlContent
    );
    this.repositoryData.map(data =>
      data.title = this.title,
    );
    this.repositoryData.map(data => {
      data.members = this.membersList
    });
    this.repositoryData.map(data => {
      data.projectId = this.repositoryId
    })
    this.workService.updateDataField(this.repositoryId, this.repositoryData[0]);
  }

  /*================================================
    [PENDING]
    [TODO]
  ===============================================*/

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
    if (id === this.selected) {
      this.selected = '';
    } else {
      this.selected = id;
    }
  }

  //  ADD SELECTED TO OBJECT/ARRAY
  addSelected(): void {
    (this.membersList.includes(this.selected)) ? console.log() : this.membersList.push(this.selected);
    this.selected = '';
    this.nameQuery = '';
    this.usersList = [];
  }

  //  REMOVE USER
  removeUserFromProject(user: string): void {

    this.membersList.splice(this.membersList.indexOf(user), 1)
  }

  //  GET MEMBERS NAME
  nameQuery = '';
  getMembers(): void {
    this.nameQuery !== '' ? this.getMembersFromDatabase() : this.usersList = [];
  }
}
