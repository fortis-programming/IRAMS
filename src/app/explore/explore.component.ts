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

  constructor(
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.setTitle('Explore')
  }
}
