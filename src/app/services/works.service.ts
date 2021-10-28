import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../_shared/models/responses/base-response.model';
import { WorksModel } from '../_shared/models/works.model';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(
    private http: HttpClient
  ) { }
  
  getWorks(): Observable<BaseResponse<WorksModel[]>> {
    return this.http.get<BaseResponse<WorksModel[]>>('../../assets/mocks/works-list.json');
  }
}
