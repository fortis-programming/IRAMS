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

  closeDocument(): void {
    this.route.navigate(['../app/explore']);
  }

}
