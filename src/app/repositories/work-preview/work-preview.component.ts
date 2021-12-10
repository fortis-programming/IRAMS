import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Editor, toHTML, Toolbar } from 'ngx-editor';

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
  repositoryId = '';
  edit = false;

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
  
  toolbar1: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["ordered_list", "bullet_list"],
    ["align_left", "align_center", "align_right", "align_justify"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
  ];

  constructor(
    private router: Router,
    private routeParams: ActivatedRoute,
    private workService: WorksService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.routeParams.params.subscribe(params => {
      this.repositoryId = params['id'];
    });
  this.updateData(this.repositoryId);
    
    // if([this.workItem].length === 0) alert('empty');
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

  //  WILL UPDATE THE LOCAL DATA FOR FRONTEND
  loading = true;
  updateData(docId: string): void {
    this.workService.getRepositoryData(this.repositoryId).then((response) => {
      this.workItem = JSON.parse(JSON.stringify(response));
      this.membersList = this.userService.getUsersMetaData(JSON.parse(JSON.stringify(this.workItem.members)));
      this.loading = false;
    });
    // this.extractMembers();
  }

  //  DETECT CHANGES
  onChange(): void {
    this.saveUpdateToDatabase(); 
  }

  //  RE-ROUTE TO PREVIEW PAGE
  closeRepository(): void {
    this.saveUpdateToDatabase();
    this.router.navigate(['../app/repositories/works']);
  }

  /*============================================
    D A T A B A S E    I N T E R A C T I O N
  ============================================*/
  //  SAVE UPDATE
  saveUpdateToDatabase(): void {
    this.workService.updateDataField(this.repositoryId, this.workItem);
  }

  /*================================================
    [PENDING]
    [TODO]
  ===============================================*/

  //  PROCESS FROM DATABASE
  membersList: Array<Object> = [];
  usersList: UsersModel[] = [];
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
    (this.membersList.includes(this.selected)) ? console.log() : this.workItem.members.push(this.selected);
    this.membersList = [];
    this.membersList = this.userService.getUsersMetaData(JSON.parse(JSON.stringify(this.workItem.members)));
    this.selected = '';
    this.nameQuery = '';
    this.usersList = [];
    console.log(this.workItem)
  }

  //  REMOVE USER
  removeUserFromProject(user: object, member: object): void {
    this.membersList.splice(this.membersList.indexOf(member), 1);
    this.workItem.members.splice(this.workItem.members.indexOf(user), 1);
  }

  //  GET MEMBERS NAME
  nameQuery = '';
  getMembers(): void {
    console.log('called');
    this.nameQuery !== '' ? this.getMembersFromDatabase() : this.usersList = [];
  }
  
  async deleteDocument(): Promise<void> {
    await this.workService.deleteDocument(this.repositoryId);
  }
}
