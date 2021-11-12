import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/main/header/header.service';
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
    private headerService: HeaderService,
    private exploreService: ExploreService
  ) { }

  //  DEFAULT PAGE SETUP FOR EXPLORE
  ngOnInit(): void {
    this.headerService.setTitle('Explore');
    if (this.filterBy === 'All') this.getAllArchive();
  }

  //  DEFAULT RETRIEVING DATA, ALL DATA WILL BE RETRIEVED AS DEFAULT
  getAllArchive(): void {
    this.exploreService.getResearches().subscribe((response) => {
      this.researches = response.data;
    });
  }
  
  //  RETRIEVE ALL RESEARCH ARCHIVE AND SET AS DEFAULT IN UI BEFORE APPLYING FILTER
  searchQuery = '';
  searchProject(): void {
    if(this.filterBy === 'All') {
      this.exploreService.getResearches().subscribe((response) => {
        this.researches = response.data.filter((research: ResearchModel) =>
          research.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      });
    } else {
      this.exploreService.getResearches().subscribe((response) => {
        this.researches = (response.data.filter((research: ResearchModel) =>
        research.title.toLowerCase().includes(this.searchQuery.toLowerCase()))).filter((research: ResearchModel) =>
          research.published.toLowerCase().includes(this.filterBy.toLowerCase()));
      });
    }
  }

  //  FILTER ARCHIVE BASED ON DATE PUBLISHED FOR BETTER DISSEMINATION OF ARCHIVES
  filterBy = 'All';
  filter(filter: string): void {
    this.filterBy = filter;
    filter === 'All' ? this.searchProject() : this.getArchiveWithFilter(filter);
  }

  //  RETRIEVE ARCHIVES BASED ON YEARP PUBLISHED
  getArchiveWithFilter(filter: string): void {
    this.exploreService.getResearches().subscribe((response) => {
      this.researches = response.data.filter((research: ResearchModel) =>
        research.published.toLowerCase().includes(filter.toLowerCase()));
    })
  }
}
