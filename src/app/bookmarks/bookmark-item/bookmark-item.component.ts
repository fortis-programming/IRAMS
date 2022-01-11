import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExploreService } from 'src/app/services/explore.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { ResearchModel } from 'src/app/_shared/models/research.model';
import { UsersModel } from 'src/app/_shared/models/users.model';

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
    private route: Router
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

  removeFromBookmark(): void {
    this.repositoryService.removeBookmark(this.researchItem.id).then(() => {
      window.location.reload();
    })
  }
}
