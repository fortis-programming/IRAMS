import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ResearchModel } from 'src/app/_shared/models/research.model';

@Component({
  selector: 'app-explore-items',
  templateUrl: './explore-items.component.html',
  styleUrls: ['./explore-items.component.scss']
})
export class ExploreItemsComponent implements OnInit {
  @Input() researchItem: ResearchModel = {
    id: '',
    title: '',
    author: '',
    type: '',
    published: '',
    abstract: '',
    college: '',
    keywords: '',
    evaluator: ''
  }

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    return;
  }

  openDocument(documentId: string): void {
    this.route.navigate(['../app/preview', documentId]);
  }
}
