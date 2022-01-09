import { Component, Input, OnInit } from '@angular/core';
import { ExploreService } from 'src/app/services/explore.service';
import { ActivatedRoute } from '@angular/router';
import { ResearchModel } from 'src/app/_shared/models/research.model';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewComponent implements OnInit {
  research: ResearchModel[] = [];
  documentId = '';

  @Input() document: ResearchModel = {
    id: '',
    title: '',
    authors: [],
    type: '',
    published: '',
    abstract: '',
    college: '',
    keywords: [],
    evaluator: '',
    status: '',
    metaData: '',
  }

  constructor(
    private exploreService: ExploreService,
    private routeData: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeData.params.subscribe(params => {
      this.documentId = params['id']; //  GET URL PARAMETER FOR DOCUMENT ID
      this.getDocumentData(params['id']);
      
    });
  }

  //  RETRIEVE DOCUMENT DATA FOR PREVIEW
  getDocumentData(docId: string): void {
    this.exploreService.getDocument(docId).then((data) => {
      this.research = JSON.parse(JSON.stringify(data));
    })
  }
}
