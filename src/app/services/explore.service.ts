import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, query, orderBy, doc, getDocs } from 'firebase/firestore';

import { ResearchModel } from '../_shared/models/research.model';
import { BaseResponse } from '../_shared/models/responses/base-response.model';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  data: Array<string> = [];
  constructor(
    private http: HttpClient
  ) { }
    
  //  GET RESEARCH ARCHIVE FROM DATABASE
  getResearches(): Observable<BaseResponse<ResearchModel[]>> {
    return this.http.get<BaseResponse<ResearchModel[]>>('../../assets/mocks/explore-list.json');
  }
  
  async getArchive(): Promise<any> {
    const queryFromDb = query(collection(db, 'archive'));
    let unsubscribe = await onSnapshot(queryFromDb, (querySnapshot) => {
      this.data.splice(0, this.data.length);
      querySnapshot.docs.map((doc) => {
        this.data.push(JSON.parse(JSON.stringify(doc.data())));
      })
    });
  }
  
  async getAllDocuments(): Promise<void> {
    const queryFromDb = query(collection(db, 'archive'));
    const snapShot = await getDocs(queryFromDb);
    snapShot.forEach((doc) => {
      // console.log(doc.data())
    });
    let data = snapShot.docs;
  }
  
  getData(): Array<any> {
    return this.data;
  }
}
