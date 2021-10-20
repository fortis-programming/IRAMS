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
