import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../main/header/header.service';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  constructor(
    private repositoryService: RepositoryService,
    private headerService: HeaderService
  ) { }

  loading = true;
  empty = false;
  keys: Array<string> = [];
  ngOnInit(): void {
    this.headerService.setTitle('Bookmarks')
    this.loading = true;
    
    this.repositoryService.getBooksmarks().then((data) => {
      this.keys = Object.keys(data);
      
      setTimeout(() => {
        (this.keys.length === 0) ? this.empty = true : this.empty = false;
        this.loading = false;
      }, 3000);
    })
  }
}
