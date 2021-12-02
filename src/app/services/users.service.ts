import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../_shared/models/responses/base-response.model';
import { UsersModel } from '../_shared/models/users.model';
import { ref, onValue } from "firebase/database";
import { database } from "../services/firebase.service";
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
  
   // USERS
   userName: Array<string> = [];
   getUsersMetaData(uid: Array<string>): Array<string> {
     this.userName = [];
     uid.forEach(data => {
       const userRef = ref(database, 'usersData/' + data);
       onValue(userRef, (snapshot) => {
         const data = snapshot.val();
         this.userName.push(data['displayName']);
       });
     })
     return this.userName;
   }
}
