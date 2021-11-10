import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../main/header/header.service';
import { ExploreService } from '../services/explore.service';
import { ResearchModel } from '../_shared/models/research.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  researches: ResearchModel[] = [];

  constructor(
    private headerService: HeaderService,
    private exploreService: ExploreService
  ) { }

  ngOnInit(): void {
    // CHANGE HEADER TITLE
    this.headerService.setTitle('Explore');
    this.exploreService.getResearches().subscribe((response) => {
      this.researches = response.data;
    });
  }

  //  SEARCH FUNCTION FOR RESEARCH ARCHIVE
  searchQuery = '';
  searchProject(): void {
    this.exploreService.getResearches().subscribe((response) => {
      this.researches = response.data.filter((research: ResearchModel) =>
        research.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    });
  }
}
