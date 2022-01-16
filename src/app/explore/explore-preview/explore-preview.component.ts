import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';

import { ExploreService } from 'src/app/services/explore.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { ResearchModel } from 'src/app/_shared/models/research.model';
import { UsersModel } from 'src/app/_shared/models/users.model';

@Component({
  selector: 'app-explore-preview',
  templateUrl: './explore-preview.component.html',
  styleUrls: ['./explore-preview.component.scss']
})
export class ExplorePreviewComponent implements OnInit {
  editor: Editor = new Editor();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exploreService: ExploreService,
    private repositoryService: RepositoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getDocumentData(params['id'])
    });
  }

  documentObject: ResearchModel = {
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
    metaData: '',
  };

  loading = true;
  added = false;
  getDocumentData(docId: string): void {
    this.exploreService.getDocumentData(docId).then((data) => {
      this.documentObject = JSON.parse(JSON.stringify(data));
      this.getUsersData();
      this.repositoryService.checkIfBookmarkExist(this.documentObject.id).then((response) => {
        this.added = response;
      })
      this.loading = false;
    })
  }

  members: UsersModel[] = [];
  getUsersData(): void {
    this.repositoryService.getUsers(this.documentObject.authors).then((data) => {
      this.members = data;
    });
  }

  closeDocument(): void {
    this.router.navigate(['../app/explore']);
  }


  addToBookmark(): void {
    this.repositoryService.saveBookmark(this.documentObject.id, this.documentObject.title).then((response) => {
      if(response) {
        this.added = true;
        this.toastr.success('', 'Added to bookmarks');
      } else {
        this.toastr.warning('', 'Document already added')
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
