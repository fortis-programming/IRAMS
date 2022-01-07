import { Injectable } from '@angular/core';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { ref, set, onValue, get, child, getDatabase } from "firebase/database";
import { WorksModel } from '../_shared/models/works.model';
import { database, firestore } from './firebase.service';
import { UsersModel } from '../_shared/models/users.model';

const firestoreInit = firestore;

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  loading = true;
  
  constructor() { }

  //  GET YOUR WORK FROM FIREBASE
  databaseUpdate: Array<WorksModel> = [];
  async getYourProjects(): Promise<void> {
    const q = query(collection(firestoreInit, 'works'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.databaseUpdate.splice(0, this.databaseUpdate.length);
      snapshot.forEach((docData) => {
        if ([[docData.data()][0]['members']].filter((data) =>
          data.includes(JSON.parse(JSON.stringify(sessionStorage.getItem('_uid'))))).length !== 0) {
          this.databaseUpdate.push(JSON.parse(JSON.stringify(docData.data())));
        }
      });
      this.loading = false;
    });
  }

  //  GET USER NAME USERNAME USING ID
  names: Array<string> = [];
  async getUserName(userId: string): Promise<void> {
    const userRef = ref(database, 'usersData/' + userId);
    this.names = [];
    onValue(userRef, (response) => {
      const data = response.val();
      this.names.push(data['displayName']);
    });
  }

  userArray: UsersModel[] = [];
  async getUsers(uid: string): Promise<UsersModel[]> {
    const userRef = ref(database, 'usersData/' + uid);
    this.userArray = [];
    await onValue(userRef, (response) => {
      const data = response.val();
      let userMeta = { uid: uid, name: data['displayName'], photoUrl: data['photoUrl']};
      this.userArray.push(userMeta);
    });
    return this.userArray;
  }
}
