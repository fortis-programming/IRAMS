import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../_shared/models/responses/base-response.model';
import { UsersModel } from '../_shared/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }
  
  getUsersList(): Observable<BaseResponse<UsersModel[]>> {
    return this.http.get<BaseResponse<UsersModel[]>>('../../assets/mocks/user-list.json');
  }
}
