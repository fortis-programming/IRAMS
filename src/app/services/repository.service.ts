import { Injectable } from '@angular/core';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { ref, set, onValue, get, child, remove } from "firebase/database";
import { WorksModel } from '../_shared/models/works.model';
import { database, firestore } from './firebase.service';
import { UsersModel } from '../_shared/models/users.model';

const firestoreInit = firestore;
const databaseRef = ref(database);

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor() { }

  async getWorks(): Promise<WorksModel[]> {
    const q = query(collection(firestoreInit, 'works'));
    let works: WorksModel[] = [];
    await onSnapshot(q, (snapshot) => {
      snapshot.forEach((docData) => {
        if ([[docData.data()][0]['members']].filter((data) =>
          data.includes(JSON.parse(JSON.stringify(sessionStorage.getItem('_uid'))))).length !== 0) {
          works.push(JSON.parse(JSON.stringify(docData.data())));
        }
      });
      this.loading = false;
    });
    return works;
  }
  
  loading = true;
  userExist = true;
  async getUsers(uid: Array<string>): Promise<UsersModel[]> {
    this.loading = true;
    let userArray: UsersModel[] = [];
    uid.forEach(id => {
      get(child(databaseRef, 'usersData/' + id)).then((response) => {
        if (response.exists()) {
          const data = response.val();
          let userMeta = { uid: id, name: data['displayName'], photoUrl: data['photoUrl'] };
          if(userMeta.photoUrl === '') userMeta.photoUrl = '../../assets/images/user.png' 
          userArray.push(JSON.parse(JSON.stringify(userMeta)));
          this.loading = false;
        } else {
          this.userExist = false;
        }
      });
    });
    return userArray;
  }

  async saveBookmark(docId: string, title: string): Promise<void> {
    const uid = sessionStorage.getItem('_uid');
    const userRef = ref(database, 'bookmarks/'+ uid + '/' + docId);

    await get(child(databaseRef, 'bookmarks/' + uid + '/' + docId)).then((response) => {
      if(!response.exists()) set(userRef, { title: title });
    });
  }

  async removeBookmark(docId: string): Promise<void> {
    const uid = sessionStorage.getItem('_uid');
    const userRef = ref(database, 'bookmarks/'+ uid + '/' + docId);
    remove(userRef);
  } 

  async getBooksmarks(): Promise<Array<string>> {
    let data: Array<string>= [];
    const uid = sessionStorage.getItem('_uid');
    await get(child(databaseRef, 'bookmarks/' + uid + '/' )).then((response) => {
      if(response.exists()) {
        data = response.val();
      }
    });
    return data;
  }
}
