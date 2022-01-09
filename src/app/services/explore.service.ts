import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firebaseConfig } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, query, doc, getDoc } from 'firebase/firestore';
import { ResearchModel } from '../_shared/models/research.model';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  data: ResearchModel[] = [];
  docId: Array<string> = [];

  constructor() { }

  //  GET ALL ARCHIVES

  
  
  loading = true;
  async getArchive(): Promise<ResearchModel[]> {
    const queryFromDb = query(collection(db, 'archive'));
    let unsubscribe = await onSnapshot(queryFromDb, (querySnapshot) => {
      this.data.splice(0, this.data.length);
      querySnapshot.docs.map((doc) => {
        this.data.push(JSON.parse(JSON.stringify(doc.data())));
      });
    });
    return this.data;
  }

  //  GET DOCUMENT INFORMATION USING DOCUMENT ID FROM FIREBASE
  document: ResearchModel[] = [];
  async getDocumentData(docId: string): Promise<ResearchModel[]> {
    const docRef = doc(db, 'archive', docId);
    const docSnap = await getDoc(docRef);
    this.document = docSnap.data() as ResearchModel[];
    return this.document;
  }

  async getDocument(docId: string): Promise<ResearchModel[]> {
    const q = query(collection(db, 'archive'));
    await onSnapshot(q, (snapshot) => {
      snapshot.forEach((docData) => {
        this.document.push(JSON.parse(JSON.stringify(docData.data())));
      });
    });
    return this.document;
  }

  getDocumentArray(): ResearchModel[] {
    return this.document;
  }

  // RETURN OBJECT LIST OF ARCHIVES
  getData(): ResearchModel[] {
    return this.data;
  }

  //  RETURN DOCUMENT IDs FROM FIRESTORE
  getDocId(): Array<string> {
    return this.docId;
  }
}
