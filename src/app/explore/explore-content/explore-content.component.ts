import { Component, OnInit } from '@angular/core';
import { ExploreService } from 'src/app/services/explore.service';

import { ResearchModel } from 'src/app/_shared/models/research.model';

@Component({
  selector: 'app-explore-content',
  templateUrl: './explore-content.component.html',
  styleUrls: ['./explore-content.component.scss']
})
export class ExploreContentComponent implements OnInit {
  researches: ResearchModel[] = [];
  constructor(
    private exploreService: ExploreService
  ) { }

  //  DEFAULT PAGE SETUP FOR EXPLORE
  ngOnInit(): void {
    this.exploreService.getArchive(this.limit).then((data) => {
      this.researches = data;
    });
  }
  
  //  DEFAULT RETRIEVING DATA, ALL DATA WILL BE RETRIEVED AS DEFAULT
  loading = true;
  limit = 10;
  getAllArchive(): void {
    this.exploreService.getArchive(this.limit).then(() => {
      this.researches = this.exploreService.getData();
      this.loading = false;
    });
  }
  
  //  RETRIEVE ALL RESEARCH ARCHIVE AND SET AS DEFAULT IN UI BEFORE APPLYING FILTER
  searchQuery = '';
  searchProject(): void {
    this.getArchiveWithTitle();
  }

  clear(): void {
    this.searchQuery = '';
    this.getArchiveWithTitle();
  }
  
  //  FILTER ARCHIVE BASED ON DATE PUBLISHED FOR BETTER DISSEMINATION OF ARCHIVES
  filterBy = 'All';
  filter(filter: string): void {
    this.filterBy = filter;
    this.getArchiveWithTitle();
  }

  //  SEARCH FOR ARCHIVE
  getArchiveWithTitle(): void {
    this.exploreService.getArchive(100).then(() => {
      if(this.filterBy === 'All') {
        this.researches = this.exploreService.getData().filter((research: ResearchModel) => 
        research.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      } else {
        this.researches = this.exploreService.getData().filter((research: ResearchModel) => 
          research.keyword.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    });
  }
}
