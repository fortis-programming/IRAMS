import { Component, OnInit, Input } from '@angular/core';
import { ResearchModel } from 'src/app/_shared/models/research.model';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { RepositoryService } from 'src/app/services/repository.service';
import { UsersModel } from 'src/app/_shared/models/users.model';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.scss']
})
export class DocumentContentComponent implements OnInit {
  editor: Editor = new Editor();
  @Input() documentObject: ResearchModel = {
    id: '',
    title: '',
    authors: [],
    type: '',
    published: '',
    abstract: '',
    college: '',
    keywords: [],
    evaluator: '',
    status: '',
    metaData: ''
  }

  authors: Array<string> = [];

  loading = true;
  constructor(
    private route: Router,
    private repositoryService: RepositoryService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  //  EXTRACT AUTHOR
  members: UsersModel[] = [];
  getUserData(): void {
    this.repositoryService.getUsers(this.documentObject.authors).then((data) => {
      this.members = data;
    });    
  }

  //  CLOSE OR REDIRECT TO PREVIOUS PAGE
  closeDocument(): void {
    this.route.navigate(['../app/explore']);
  }

  getKeywords(): string {
    return this.documentObject.keywords.join(', ');
  }

}
