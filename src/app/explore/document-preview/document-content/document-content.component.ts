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
    author: [],
    type: '',
    published: '',
    abstract: '',
    college: '',
    keywords: '',
    evaluator: ''
  }

  authors: Array<string> = [];

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    this.exportAuthor();
  }

  //  EXTRACT AUTHOR
  exportAuthor(): void {
    this.documentObject.author.forEach(member => {
      let data = Object.values(JSON.parse(JSON.stringify(member)))[0];
      this.authors.push(JSON.parse(JSON.stringify(data)))
    });
  }

  //  CLOSE OR REDIRECT TO PREVIOUS PAGE
  closeDocument(): void {
    this.route.navigate(['../app/explore']);
  }

}
