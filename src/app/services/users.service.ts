import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../_shared/models/responses/base-response.model';
import { UsersModel } from '../_shared/models/users.model';
import { ref, set, onValue, get, child, getDatabase } from "firebase/database";
import { database } from "../services/firebase.service";

import { AccountModel } from '../_shared/models/account.model';
import { ContributorsModel } from '../_shared/models/contributors.model';

const dbRef = ref(getDatabase());

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

  users: AccountModel[] = [];
  async getUserList(): Promise<AccountModel[]> {
    await get(child(dbRef, 'usersData/')).then((snapshot) => {
      if (snapshot.exists()) {
        this.users = snapshot.val();
      }
    });
    return this.users;
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
    });
    return this.userName;
  }

  getContributors(uid: string): Array<ContributorsModel> {
    const users: ContributorsModel[] = [];
    const arrayHolder: ContributorsModel[] = [];
    const databaseRef = ref(database, 'usersData/' + uid);
    onValue(databaseRef, (response) => {
      
      const dataHolder = response.val();
      arrayHolder.push(dataHolder['displayName']);
      arrayHolder.push(dataHolder['photoUrl']);
    });

    return arrayHolder;
    // onValue(databaseRef, (response) => {
    //   const dataHolder = response.val();
    //   user.push(dataHolder['displayName']);
    //   console.log(user);
    // });
  }

  usermetaData: Array<AccountModel> = [];
  async getUserMetaData(uid: Array<string>): Promise<Array<AccountModel>> {
    await get(child(dbRef, 'usersData/' + uid)).then((snapshot) => {
      if (snapshot.exists()) {
        this.usermetaData = snapshot.val();
      }
    });
    return this.usermetaData;
  }

  saveAccountChanges(account: AccountModel): void {
    const uid = sessionStorage.getItem('_name');
    const userRef = ref(database, 'usersData/' + uid);
    set(userRef, account);
  }
}