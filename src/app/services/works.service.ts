import { Injectable } from '@angular/core';
import { firebaseConfig } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, query, where, setDoc, doc, getDocs } from 'firebase/firestore';
import { WorksModel } from '../_shared/models/works.model';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})

export class WorksService {
  data: WorksModel[] = [];
  docIds: Array<string> = [];
  constructor() { }

  docId = '';
  async getYourWorks(): Promise<Array<WorksModel[]>> {
    const querySnapshot = await getDocs(collection(db, "works"));
    this.data = [];
    querySnapshot.forEach((doc) => {
      this.data.push(JSON.parse(JSON.stringify(doc.data())));
    });
    return JSON.parse(JSON.stringify(this.data));
  }

  /* 
  =============================================
  WILL RETURN THE REALTIME UPDATE FROM DATABASE
  =============================================
  */

  //  GATHER UPDATES FROM DATABASE
  databaseUpdate: Array<WorksModel> = [];
  realTimeUpdate(): void {
    const q = query(collection(db, "works"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.databaseUpdate.splice(0, this.databaseUpdate.length)
      querySnapshot.forEach((doc) => {
        if ([[doc.data()][0]['members']].filter((data) => data.includes(JSON.parse(JSON.stringify(sessionStorage.getItem('_name'))))).length !== 0) {
          this.databaseUpdate.push(JSON.parse(JSON.stringify(doc.data())));
        }
      });
    });
  }

  //  RETRIEVE REALTIME UPDATES AND SEND TO FRONT-END
  getDatabaseUpdate(): Array<WorksModel> {
    return this.databaseUpdate;
  }

  repositoryData: Array<WorksModel> = [];
  async getRepositoryData(docId: string): Promise<void> {
    const q = query(collection(db, 'works'));
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      this.repositoryData.splice(0, this.repositoryData.length)
      querySnapshot.forEach((doc) => {
        if ([doc.data()][0]['projectId'] === docId) {
          this.repositoryData.push(JSON.parse(JSON.stringify(doc.data())));
        }
      });
    });
  }

  // SEND GATHERED UPDATE FROM DATABASE TO FRONTEND
  sendRepositoryData(): Array<WorksModel> {
    return this.repositoryData;
  }

  //  RETURN OBJECT
  getWorks(): Array<any> {
    return this.data;
  }

  //  RETURN DOC IDs OF WORKS [ORIGIN]: FIRESTORE
  getDocID(): Array<string> {
    return this.docIds;
  }

  //  RETURN DOCUMENT DATA USING DOCUMENT ID PROVIDED BY FIRESTORE
  // repositoryData: WorksModel[] = [];
  async getWorkData(docId: string): Promise<WorksModel[]> {
    const unsub = await onSnapshot(doc(db, 'works', docId), (doc) => {
      this.repositoryData = [];
      this.repositoryData.push(JSON.parse(JSON.stringify(doc.data())));
    });

    return [JSON.parse(JSON.stringify(this.repositoryData))];
  }

  //  [PENDING] UPDATE DOCUMENT CONTENT
  pendingWrite = '';
  async parseEditorData(docId: string): Promise<void> {
    const queryFromDb = query(collection(db, 'works'));
    let unsubscribe = await onSnapshot(queryFromDb, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        this.pendingWrite = source;
        console.log(this.pendingWrite)
        if (doc.id === docId) this.getHtmlDoc([JSON.parse(JSON.stringify(doc.data()))]);
      })
    })
  }

  //  [PENDING] SYNCHRONOUSLY UPDATE
  htmlContent = '';
  getHtmlDoc(doc: Array<WorksModel>): void {
    this.htmlContent = doc[0]['data'];
  }

  getHtmlUpdate(): string {
    return this.htmlContent;
  }

  getWriteStatus(): string {
    return this.pendingWrite;
  }

  //  UPDATE DOCUMENT CHANGES TO DATABASE
  async updateDataField(docId: string, htmlDoc: Object): Promise<void> {
    const ref = doc(db, 'works', docId);
    await setDoc(ref, htmlDoc);
  }
}
