import { Component, OnInit } from '@angular/core';
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

  constructor(
    private exploreService: ExploreService,
    private routeData: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeData.params.subscribe(params => {
      this.documentId = params['id']; //  GET URL PARAMETER FOR DOCUMENT ID
    });

    this.getDocumentData();
  }

  //  RETRIEVE DOCUMENT DATA FOR PREVIEW
  getDocumentData(): void {
    this.research = [];
    this.research = this.exploreService.getData().filter((research: ResearchModel) => 
      research.id.includes(this.documentId))
  }
}
