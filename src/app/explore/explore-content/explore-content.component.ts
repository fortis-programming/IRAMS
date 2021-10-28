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
  searchQuery = '';
  emptyMessage = false;
  constructor(
    private headerService: HeaderService,
    private exploreService: ExploreService
  ) { }

  ngOnInit(): void {
    this.headerService.setTitle('Explore');
    this.exploreService.getResearches().subscribe((response) => {
      this.researches = response.data;
    });
  }

  searchProject(): void {
    this.exploreService.getResearches().subscribe((response) => {
      this.researches = response.data.filter((research: ResearchModel) => research.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      if (this.researches.length === 0) this.emptyMessage = true;
      else this.emptyMessage = false;
    });
  }
}
