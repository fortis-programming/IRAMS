import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResearchModel } from '../_shared/models/research.model';
import { BaseResponse } from '../_shared/models/responses/base-response.model';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  constructor(
    private http: HttpClient
  ) { }
    
  //  GET RESEARCH ARCHIVE FROM DATABASE
  getResearches(): Observable<BaseResponse<ResearchModel[]>> {
    return this.http.get<BaseResponse<ResearchModel[]>>('../../assets/mocks/explore-list.json');
  }
  
}
