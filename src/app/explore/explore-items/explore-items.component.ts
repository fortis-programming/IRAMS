import { Component, OnInit, Input } from '@angular/core';

import { ResearchModel } from 'src/app/_shared/models/research.model';

@Component({
  selector: 'app-explore-items',
  templateUrl: './explore-items.component.html',
  styleUrls: ['./explore-items.component.scss']
})
export class ExploreItemsComponent implements OnInit {
  @Input() researchItem: ResearchModel = {
    title: '',
    author: '',
    type: '',
    published: '',
    abstract: '',
    college: '',
    keywords: ''
  }
  constructor() { }

  ngOnInit(): void {
  }

}
