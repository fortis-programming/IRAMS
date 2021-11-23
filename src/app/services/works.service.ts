import { Injectable } from '@angular/core';
import { firebaseConfig } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, query, setDoc, doc, getDocs, addDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { WorksModel } from '../_shared/models/works.model';
import { ProjectModel } from '../_shared/models/project.model';

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
  async getRepositoryData(docId: string): Promise<Array<WorksModel>> {
    const docRef = doc(db, 'works', 'pdfw3FjZZNxcErZaVQvt');
    const docSnap = await getDoc(docRef);
    return JSON.parse(JSON.stringify(docSnap.data()));
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

  //  UPDATE DOCUMENT CHANGES TO DATABASE
  async updateDataField(docId: string, htmlDoc: Object): Promise<void> {
    const ref = doc(db, 'works', docId);
    await setDoc(ref, htmlDoc);
  }

  /*
    WRITE PROJECT
  */

  //  CREATE PROJECT
  async createProject(project: ProjectModel): Promise<void> {
    const docRef = await addDoc(collection(db, 'works'), project);
    const ref = doc(db, 'works', docRef.id);
    [project][0].projectId = docRef.id;
    await setDoc(ref, project);
  }
  
  async deleteProject(docId: string): Promise<boolean> {
    await deleteDoc(doc(db, 'works', docId));
    return true;
  }
}
