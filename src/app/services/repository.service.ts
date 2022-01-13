import { Injectable } from '@angular/core';
import { onSnapshot, collection, query, doc } from 'firebase/firestore';
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

  async checkForUpdates(): Promise<string> {
    let response = '';
    const q = query(collection(firestoreInit, 'works'));
    const unsubscribe = await onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
          response = change.type;
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });
    return response;
  }

  works: WorksModel[] = [];
  worksId: Array<string> = [];
  async getWorks(): Promise<WorksModel[]> {
    const q = query(collection(firestoreInit, 'works'));
    await onSnapshot(q, (snapshot) => {
      snapshot.forEach((docData) => {
        if ([[docData.data()][0]['members']].filter((data) =>
          data.includes(JSON.parse(JSON.stringify(sessionStorage.getItem('_uid'))))).length !== 0) {

          if(this.worksId.includes([docData.data()][0]['projectId'])) return;

          this.works.push(JSON.parse(JSON.stringify(docData.data())));
          this.worksId.push([docData.data()][0]['projectId']);
          
        }
      });
      this.loading = false;
    });
    return this.works;
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
          if (userMeta.photoUrl === '') userMeta.photoUrl = '../../assets/images/user.png'
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
    const userRef = ref(database, 'bookmarks/' + uid + '/' + docId);

    await get(child(databaseRef, 'bookmarks/' + uid + '/' + docId)).then((response) => {
      if (!response.exists()) set(userRef, { title: title });
    });
  }

  async removeBookmark(docId: string): Promise<void> {
    const uid = sessionStorage.getItem('_uid');
    const userRef = ref(database, 'bookmarks/' + uid + '/' + docId);
    remove(userRef);
  }

  async getBooksmarks(): Promise<Array<string>> {
    let data: Array<string> = [];
    const uid = sessionStorage.getItem('_uid');
    await get(child(databaseRef, 'bookmarks/' + uid + '/')).then((response) => {
      if (response.exists()) {
        data = response.val();
      }
    });
    return data;
  }
}
