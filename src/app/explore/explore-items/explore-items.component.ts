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
    authors: [],
    type: '',
    published: '',
    abstract: '',
    college: '',
    keywords: '',
    evaluator: ''
  }
  
  @Input() docId: string = '';

  authors: Array<string> = [];
  
  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    this.extractAuthor();
  }
  
  //  EXTRACT AUTHOR(S)
  extractAuthor(): void {
    this.researchItem.authors.map(member=> {
      this.authors.push(member)
    })
    // this.researchItem.author.forEach(members => {
    //   let data = Object.values(JSON.parse(JSON.stringify(members)))[0];
    //   this.authors.push(JSON.parse(JSON.stringify(data)))
    // });
  }
  
  //  OPEN DOCUMENT FOR RESEARCH DATA PREVIEW
  openDocument(): void {
    this.route.navigate(['../app/explore/preview', this.docId]);
  }
}
