import { Injectable } from '@angular/core';
import { firebaseConfig } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, query, setDoc, doc, getDoc } from 'firebase/firestore';
import { WorksModel } from '../_shared/models/works.model';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  data: Array<WorksModel> = [];
  docIds: Array<string> = [];

  constructor(
  ) { }

  //  RETURN ALL OF YOUR WORKS
  docId = '';
  async getYourWorks(): Promise<any> {
    const queryFromDb = query(collection(db, 'works'));
    let unsubscribe = await onSnapshot(queryFromDb, (querySnapshot) => {
      console.log('updating');
      this.data.splice(0, this.data.length);
      this.parseEditorData(this.docId);
      querySnapshot.docs.map((doc) => {
        this.docIds.push(doc.id);
        this.data.push(JSON.parse(JSON.stringify(doc.data())));
      });
    })
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
  async getWorkData(docId: string): Promise<Array<any>> {
    this.docId = docId;
    const docRef = doc(db, 'works', docId);
    const docSnap = await getDoc(docRef);
    return [JSON.parse(JSON.stringify(docSnap.data()))];
  }

  //  [PENDING] UPDATE DOCUMENT CONTENT
  async parseEditorData(docId: string): Promise<void> {
    const queryFromDb = query(collection(db, 'works'));
    let holder: Array<string> = [];
    let unsubscribe = await onSnapshot(queryFromDb, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
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
  //  [PENDING] GET UPDATE
  getUpdates(): Array<any> {
    return this.data;
  }

  //  UPDATE DOCUMENT CHANGES TO DATABASE
  async updateDataField(htmlDoc: Object): Promise<void> {
    console.log(htmlDoc);
    const ref = doc(db, 'works', 'WCKq76W2bQPk9MQUIVCl');
    await setDoc(ref, htmlDoc);
  }
}
