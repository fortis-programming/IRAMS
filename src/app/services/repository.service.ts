import { Injectable } from '@angular/core';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { ref, set, onValue, get, child } from "firebase/database";
import { WorksModel } from '../_shared/models/works.model';
import { database, firestore } from './firebase.service';
import { UsersModel } from '../_shared/models/users.model';

const firestoreInit = firestore;
const databaseRef = ref(database);

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  loading = true;

  constructor() { }

  async getWorks(): Promise<WorksModel[]> {
    const q = query(collection(firestoreInit, 'works'));
    let works: WorksModel[] = [];
    works.splice(0, works.length);
    await onSnapshot(q, (snapshot) => {
      snapshot.forEach((docData) => {
        if ([[docData.data()][0]['members']].filter((data) =>
          data.includes(JSON.parse(JSON.stringify(sessionStorage.getItem('_uid'))))).length !== 0) {
          works.push(JSON.parse(JSON.stringify(docData.data())));
        }
      });
    });
    return works;
  }

  userExist = true;
  async getUsers(uid: Array<string>): Promise<UsersModel[]> {
    this.loading = true;
    let userArray: UsersModel[] = [];
    uid.forEach(id => {
      get(child(databaseRef, 'usersData/' + id)).then((response) => {
        if (response.exists()) {
          const data = response.val();
          let userMeta = { uid: id, name: data['displayName'], photoUrl: data['photoUrl'] };
          userArray.push(JSON.parse(JSON.stringify(userMeta)));
          this.loading = false;
        } else {
          this.userExist = false;
        }
      });
    });
    return userArray;
  }
}
