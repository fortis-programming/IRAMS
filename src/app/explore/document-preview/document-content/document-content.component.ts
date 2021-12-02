import { Component, OnInit, Input } from '@angular/core';
import { ResearchModel } from 'src/app/_shared/models/research.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.scss']
})
export class DocumentContentComponent implements OnInit {
  @Input() documentObject: ResearchModel = {
    id: '',
    title: '',
    authors: [],
    type: '',
    published: '',
    abstract: '',
    college: '',
    keywords: '',
    evaluator: '',
    status: ''
  }

  authors: Array<string> = [];

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    this.exportAuthor();
  }

  //  EXTRACT AUTHOR
  authorString = '';
  exportAuthor(): void {
    this.documentObject.authors.map(member=> {
      this.authors.push(member)
    });
    this.authorString = this.authors.join(', ');
  }

  //  CLOSE OR REDIRECT TO PREVIOUS PAGE
  closeDocument(): void {
    this.route.navigate(['../app/explore']);
  }

}
