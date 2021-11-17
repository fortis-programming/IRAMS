import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularEditorConfig } from '@kolkov/angular-editor';

import { toDoc, toHTML } from 'ngx-editor';

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

  editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    outline: false,
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  htmlContent = '';

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
    this.sendLocalchangesToFirestore();
  }

  //  AUTO SAVE FUNCTION
  time = 0;
  autoSave(): void {
    let timer = setInterval(() => {
      if (!this.updateTrigger) this.time = this.time + 1;
      if (this.time >= 10) {
        this.saveUpdateToDatabase();
        this.time = 0;
        this.updateTrigger = true;
      }
    }, 1000);
    if (this.time >= 10) clearInterval(timer);
  }

  //  AUTO UPDATE FUNCTION
  updateTrigger = true;
  updateFunction(): void {
    if (this.updateTrigger) this.updateDocumentContent();
  }

  // TRIGGERS FOR AUTO SAVING AND UPDATE
  onChange(): void {
    this.time = 0;
    if (this.updateTrigger) {
      this.updateTrigger = false;
      this.autoSave();
    }
  }

  //  EXTRACT AUTHORS
  extractMembers(): void {
    this.repositoryData.map(data => {
      this.membersList = JSON.parse(JSON.stringify(data.members))
    })
  }

  //  EXTRACT DOCUMENT
  extractDocument(): void {
    this.repositoryData.map(data =>
      this.htmlContent = data.data
    )
  }

  //  RE-ROUTE TO PREVIEW PAGE
  closeRepository(): void {
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
    this.workService.updateDataField(this.repositoryData[0]);
  }

  //  UPDATE DATA/DOCUMENT CONTENT IN DATABASE TO SAVE CHANGE FROM LOCAL
  sendLocalchangesToFirestore(): void {
    this.workService.getWorkData(this.repositoryId).then((response) => {
      this.repositoryData = response;
      this.workService.getYourWorks();
      this.extractMembers();
      this.extractDocument();
    })
  }

  //  UPDATE DOCUMENT CONTENT FROM SERVICE
  updateDocumentContent(): void {
    this.htmlContent = this.workService.getHtmlUpdate().toString();
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
    this.selected = id;
  }

  //  ADD SELECTED TO OBJECT/ARRAY
  addSelected(): void {
    (this.membersList.includes(this.selected)) ? console.log() : this.membersList.push(this.selected)
  }

  //  GET MEMBERS NAME
  nameQuery = '';
  getMembers(): void {
    this.nameQuery !== '' ? this.getMembersFromDatabase() : this.usersList = [];
  }
}
