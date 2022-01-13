import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Editor, toHTML, Toolbar, } from 'ngx-editor';

import { WorksModel } from 'src/app/_shared/models/works.model';

import { WorksService } from 'src/app/services/works.service';
import { ValidationRequest } from 'src/app/_shared/models/requests/validation.request';
import { RepositoryService } from 'src/app/services/repository.service';
import { UsersModel } from 'src/app/_shared/models/users.model';
import { ResearchModel } from 'src/app/_shared/models/research.model';
import { WorksComponent } from '../works/works.component';
import { HeaderService } from 'src/app/main/header/header.service';

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
    metaData: ''
  }

  requestValidation: ValidationRequest = {
    validator: 'Select a validator',
    message: '',
    metaData: '',
    sender: '',
    type: '',
    members: [],
    comments: [],
    status: ''
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
    private repositoryService: RepositoryService,
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    this.routeParams.params.subscribe(params => {
      this.repositoryId = params['id'];
    });
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

  //  WILL UPDATE THE LOCAL DATA FOR FRONTEND
  loading = true;
  contributors: UsersModel[] = [];
  updateData(): void {
    this.workService.getRepositoryData(this.repositoryId).then((response) => {
      this.workItem = JSON.parse(JSON.stringify(response));
      this.getUserMeta();
      this.loading = false;
    });
  }
  
  getUserMeta(): void {
    this.repositoryService.getUsers(this.workItem.members).then((data) => {
      this.contributors = data;
    });
  }

  //  DETECT CHANGES
  onChange(): void {
    this.saveUpdateToDatabase();
  }

  // private headerService: HeaderService,
  // private worksService: WorksService,
  // private repositoryService: RepositoryService,
  // private router: Router
  workComponent = new WorksComponent(this.headerService, this.workService, this.repositoryService, this.router)
  //  RE-ROUTE TO PREVIEW PAGE
  closeRepository(): void {
    this.saveUpdateToDatabase();
    setTimeout(() => {
      this.router.navigate(['../app/repositories/works']);
    }, 1000);
  }

  /*============================================
    D A T A B A S E    I N T E R A C T I O N
  ============================================*/
  //  SAVE UPDATE
  saveUpdateToDatabase(): void {
    this.workService.updateDataField(this.workItem);
  }

  //  GET PROCESS STATUS
  processing(): boolean {
    return this.repositoryService.loading;
  }

  userExist(): boolean {
    return this.repositoryService.userExist;
  }

  nameQuery = '';
  queryResultHolder: UsersModel[] = [];
  searchForUser(): void {
    if(this.nameQuery === '') {
      this.queryResultHolder = [];
      return;
    }

    this.repositoryService.getUsers([this.nameQuery]).then((data) => {
      console.log(data);
      this.queryResultHolder = data;
    });
  }

  selected = '';
  selectUser(uid: string): void {
    (this.selected === '')? this.selected = uid : this.selected = '';
  }

  addContributorToProject(): void {
    this.workItem.members.push(this.selected);
    this.selected = '';
    this.saveUpdateToDatabase();
    this.updateData();
  }
  
  removeContributor(uid: string): void {
    this.workItem.members.splice(this.workItem.members.indexOf(uid), 1);
    this.saveUpdateToDatabase();
    this.updateData();
  }

  publishDocument: ResearchModel = {
    id: '',
    title: '',
    authors: [],
    type: '',
    published: '',
    abstract: '',
    college: '',
    keyword: '',
    evaluator: '',
    status: '',
    metaData: ''
  }

  publish(): void {
    this.publishDocument.id = this.workItem.projectId;
    this.publishDocument.title = this.workItem.title;
    this.publishDocument.authors = this.workItem.members;
    this.publishDocument.type = this.workItem.type;
    this.publishDocument.published = new Date().toISOString().split('T')[0];
    this.publishDocument.college = this.workItem.college;
    this.publishDocument.evaluator = 'Test Evaluator';
    this.publishDocument.status = this.workItem.status;
    this.publishDocument.metaData = this.workItem.metaData;
    this.workService.pushWork(this.publishDocument).then(() => {
      this.workItem.status = 'Published'
      this.workService.updateDataField(this.workItem);
    });
  }
  
  async deleteDocument(): Promise<void> {
    await this.workService.deleteDocument(this.repositoryId);
    setTimeout(() => {
      this.workComponent.refreshComponent();
    }, 1000);
  }

  createValidationRequest(): void {
    this.requestValidation.metaData = this.workItem.metaData;
    this.requestValidation.sender = JSON.parse(JSON.stringify(sessionStorage.getItem('_name')));
    this.requestValidation.members = this.workItem.members;
    console.log(this.requestValidation)
    // this.workService.createRequestValidation(this.requestValidation);
  }

  hasError(formControl: any): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }
}
