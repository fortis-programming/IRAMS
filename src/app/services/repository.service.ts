import { Injectable } from '@angular/core';
import { onSnapshot, collection, query, doc, where, getDocs } from 'firebase/firestore';
import { ref, set, onValue, get, child, remove } from "firebase/database";
import { WorksModel } from '../_shared/models/works.model';
import { database, firestore } from './firebase.service';
import { UsersModel } from '../_shared/models/users.model';
import { Router } from '@angular/router';

const firestoreInit = firestore;
const databaseRef = ref(database);

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private router: Router
  ) { }

  async checkForUpdates(): Promise<boolean> {
    const q = query(collection(firestoreInit, 'works'));
    const response = new Promise<boolean>((resolve) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // console.log("New city: ", change.doc.data());
            resolve(true)
          }
          if (change.type === "modified") { 
            // console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            // console.log("Removed city: ", change.doc.data());
            resolve(true);
          }
          resolve(false)
        });
      });
    })
    return response;
  }

  works: WorksModel[] = [];
  worksId: Array<string> = [];
  async getRepositories(): Promise<WorksModel[]> {
    const response = new Promise<any>((resolve) => {
      const q = query(collection(firestoreInit, 'works'), where('members', 'array-contains-any', [JSON.parse(JSON.stringify(sessionStorage.getItem('_uid')))]));
        onSnapshot(q, (snapshot) => {
          let data: WorksModel[] = [];
          snapshot.forEach((docData) => {
            data.push(JSON.parse(JSON.stringify(docData.data())));
          });
          resolve(data);
        });
      });
    return response;
  }

  async getWorks(): Promise<WorksModel[]> {
    const q = query(collection(firestoreInit, 'works'));
    await onSnapshot(q, (snapshot) => {
      snapshot.forEach((docData) => {
        if ([[docData.data()][0]['members']].filter((data) =>
          data.includes(JSON.parse(JSON.stringify(sessionStorage.getItem('_uid'))))).length !== 0) {

          if (this.worksId.includes([docData.data()][0]['projectId'])) return;

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

  async checkIfBookmarkExist(docId: string): Promise<boolean> {
    const uid = sessionStorage.getItem('_uid');
    const useRef = 'bookmarks/' + uid + docId;
    const response = new Promise<boolean>((resolve) => {
      get(child(databaseRef, 'bookmarks/' + uid + '/' + docId)).then((response) => {
        if (response.exists()) {
          resolve(true)
        } else {
          resolve(false);
        }
      })
    });
    return response;
  }

  async saveBookmark(docId: string, title: string): Promise<boolean> {
    const uid = sessionStorage.getItem('_uid');
    const userRef = ref(database, 'bookmarks/' + uid + '/' + docId);
    const response = new Promise<boolean>((resolve, reject) => {
      get(child(databaseRef, 'bookmarks/' + uid + '/' + docId)).then((response) => {
        if (!response.exists()) {
          set(userRef, { title: title });
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
    return response;
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
