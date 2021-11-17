import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firebaseConfig } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, query, doc, getDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  data: Array<string> = [];
  docId: Array<string> = [];

  constructor() { }

  //  GET ALL ARCHIVES
  async getArchive(): Promise<any> {
    const queryFromDb = query(collection(db, 'archive'));
    let unsubscribe = await onSnapshot(queryFromDb, (querySnapshot) => {
      this.data.splice(0, this.data.length);
      querySnapshot.docs.map((doc) => {
        this.docId.push(doc.id);
        this.data.push(JSON.parse(JSON.stringify(doc.data())));
      })
    });
  }

  //  GET DOCUMENT INFORMATION USING DOCUMENT ID FROM FIREBASE
  async getDocumentData(docId: string): Promise<Array<any>> {
    const docRef = doc(db, 'archive', docId);
    const docSnap = await getDoc(docRef);

    return [JSON.parse(JSON.stringify(docSnap.data()))];
  }

  // RETURN OBJECT LIST OF ARCHIVES
  getData(): Array<any> {
    return this.data;
  }

  //  RETURN DOCUMENT IDs FROM FIRESTORE
  getDocId(): Array<string> {
    return this.docId;
  }
}
