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
    //  GET URL PARAMETER FOR DOCUMENT ID
    this.routeData.params.subscribe(params => {
      this.documentId = params['id'];
    });
    this.getDocumentData();
  }

  //  RETRIEVE DOCUMENT DATA FOR PREVIEW
  getDocumentData(): void {
    this.exploreService.getResearches().subscribe((response) => {
      this.research = response.data.filter((research: ResearchModel) => 
        research.id.includes(this.documentId));
    })
  }
}
