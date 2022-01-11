import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ExploreService } from 'src/app/services/explore.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { ResearchModel } from 'src/app/_shared/models/research.model';
import { UsersModel } from 'src/app/_shared/models/users.model';

@Component({
  selector: 'app-explore-items',
  templateUrl: './explore-items.component.html',
  styleUrls: ['./explore-items.component.scss']
})
export class ExploreItemsComponent implements OnInit {
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
    private route: Router,
    private repositoryService: RepositoryService,
    private exploreService: ExploreService
  ) { }

  ngOnInit(): void {
    this.extractAuthor();
  }
  
  bookmark(): void {
    this.exploreService.addToMyBookmarks(this.researchItem.id);
  }

  authors: UsersModel[] = [];
  extractAuthor(): void {
    this.repositoryService.getUsers(this.researchItem.authors).then((data) => {
      this.authors = data;
    });
  }
  
  //  OPEN DOCUMENT FOR RESEARCH DATA PREVIEW
  openDocument(): void {
    this.route.navigate(['../app/explore/view', this.researchItem.id]);
  }
}
