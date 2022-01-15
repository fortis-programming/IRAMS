import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/main/header/header.service';
import { ExploreService } from 'src/app/services/explore.service';
import { RepositoryService } from 'src/app/services/repository.service';

import { ResearchModel } from 'src/app/_shared/models/research.model';
import { UsersModel } from 'src/app/_shared/models/users.model';
import { BookmarksComponent } from '../bookmarks.component';

@Component({
  selector: 'app-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss']
})
export class BookmarkItemComponent implements OnInit {
  @Input() docId = '';
  @Input() researchItem: ResearchModel = {
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

  constructor(
    private exploreService: ExploreService,
    private repositoryService: RepositoryService,
    private route: Router,
    private toastr: ToastrService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.exploreService.getDocumentData(this.docId).then((data) => {
      this.researchItem = JSON.parse(JSON.stringify(data));
      this.extractAuthor();
    });
  }

  authors: UsersModel[] = [];
  extractAuthor(): void {
    this.repositoryService.getUsers(this.researchItem.authors).then((data) => {
      this.authors = data;
    });
  }

  openDocument(): void {
    this.route.navigate(['../app/explore/view', this.researchItem.id]);
  }

  bookmark = new BookmarksComponent(this.repositoryService, this.headerService, this.route);
  removeFromBookmark(): void {
    
    this.repositoryService.removeBookmark(this.researchItem.id).then(() => {
      // this.toastr.success('', 'Bookmark was removed');
      this.bookmark.refresh();
    })
  }
}
