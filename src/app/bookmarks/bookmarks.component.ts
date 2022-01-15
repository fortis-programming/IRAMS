import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private headerService: HeaderService,
    private router: Router
  ) { }

  loading = true;
  empty = false;
  keys: Array<string> = [];
  ngOnInit(): void {
    this.headerService.setTitle('Bookmarks')
    this.loading = true;
    
    this.repositoryService.getBooksmarks().then((data) => {
      console.log(data)
      this.keys = Object.keys(data);
      
      setTimeout(() => {
        (this.keys.length === 0) ? this.empty = true : this.empty = false;
        this.loading = false;
      }, 500);
    })
  }

  public refresh(): void {
    console.log('refresh');
    this.router.navigate(['/app/explore'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['app/bookmarks']);
    })
  }
}
