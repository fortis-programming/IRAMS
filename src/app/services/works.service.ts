import { Injectable } from '@angular/core';

import { onSnapshot, collection, query, setDoc, doc, getDocs, addDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { WorksModel } from '../_shared/models/works.model';
import { ProjectModel } from '../_shared/models/project.model';
import { Router } from '@angular/router';

import { firestore } from './firebase.service';
import { ValidationRequest } from '../_shared/models/requests/validation.request';
import { ResearchModel } from '../_shared/models/research.model';
import { ValidationStatus } from '../_shared/models/validationStatus.model';
import { HistoryModel } from '../_shared/models/history-item.model';

const firestoreInit = firestore;

@Injectable({
  providedIn: 'root'
})

export class WorksService {
  data: WorksModel[] = [];
  
  constructor(
    private router: Router
  ) { } 
    
  docId = '';
  async getYourWorks(): Promise<Array<WorksModel[]>> {
    const querySnapshot = await getDocs(collection(firestoreInit, "works"));
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
  loading = true;
  databaseUpdate: Array<WorksModel> = [];
  realTimeUpdate(): void {
    const q = query(collection(firestoreInit, "works"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.databaseUpdate.splice(0, this.databaseUpdate.length);
      querySnapshot.forEach((doc) => {
        if ([[doc.data()][0]['contributors']].filter((data) => data.includes(JSON.parse(JSON.stringify(sessionStorage.getItem('_name'))))).length !== 0) {
          this.databaseUpdate.push(JSON.parse(JSON.stringify(doc.data())));
        }
      });
      this.loading = false;
    });
  }
  
  //  RETRIEVE REALTIME UPDATES AND SEND TO FRONT-END
  async getDatabaseUpdate(): Promise<Array<WorksModel>> {
    return this.databaseUpdate;
  }

  repositoryData: Array<WorksModel> = [];
  async getRepositoryData(docId: string): Promise<Array<WorksModel>> {
    const docRef = doc(firestoreInit, 'works', docId);
    const docSnap = await getDoc(docRef);
    return JSON.parse(JSON.stringify(docSnap.data()));
  }

  async pushWork(docToPublish: ResearchModel): Promise<void> {
    const ref = doc(firestoreInit, 'archive', docToPublish.id);
    await setDoc(ref, docToPublish);
  }

  //  RETURN DOCUMENT DATA USING DOCUMENT ID PROVIDED BY FIRESTORE
  async getWorkData(docId: string): Promise<WorksModel[]> {
    const unsub = await onSnapshot(doc(firestoreInit, 'works', docId), (doc) => {
      this.repositoryData = [];
      this.repositoryData.push(JSON.parse(JSON.stringify(doc.data())));
    });

    return [JSON.parse(JSON.stringify(this.repositoryData))];
  }

  //  UPDATE DOCUMENT CHANGES TO DATABASE
  async updateDataField(htmlDoc: WorksModel): Promise<void> {
    const ref = doc(firestoreInit, 'works', htmlDoc.projectId);
    await setDoc(ref, htmlDoc);
  }

  validationStatus: ValidationStatus = {
    status: '',
    comment: '',
    evaluator: '',
    docId: ''
  }

  async getRequest(): Promise<void> {
    const q = query(collection(firestore, 'validationRequests',));
    const unsubscribe = await onSnapshot(q, (snapshot) => {
      snapshot.forEach((docData) => {
        if([docData.data()][0]['sender'] === sessionStorage.getItem('_uid')) {
          const status = {
            status: [docData.data()][0]['status'],
            comment: [docData.data()][0]['comments'],
            evaluator: [docData.data()][0]['validator'],
            docId: docData.id
          }  
          this.validationStatus = status;
        }
      });
    });
  }
  
  async getAllRequest(): Promise<HistoryModel[]> {
    let requestItems: HistoryModel[] = [];
    requestItems = [];
    const q = query(collection(firestore, 'validationRequests',));
    const unsubscribe = await onSnapshot(q, (snapshot) => {
      snapshot.forEach((docData) => {
        if([docData.data()][0]['sender'] === sessionStorage.getItem('_uid')) {
          
          const item: HistoryModel = {
            docId: docData.id,
            comment: [docData.data()][0]['comments'],
            evaluator: [docData.data()][0]['validator'],
            message: [docData.data()][0]['message'],
            date: [docData.data()][0]['date']
          }
          requestItems.push(JSON.parse(JSON.stringify(item)));
        }
      });
    });
    return requestItems;
  }

  getRequestData(): ValidationStatus {
    return this.validationStatus
  }

  /*
    WRITE PROJECT
  */

  //  CREATE PROJECT
  async createProject(project: ProjectModel): Promise<void> {
    const docRef = await addDoc(collection(firestoreInit, 'works'), project);
    const ref = doc(firestoreInit, 'works', docRef.id);
    [project][0].projectId = docRef.id;
    await setDoc(ref, project);
  }

  deleteDocument(docId: string): Promise<boolean> {
    const response = new Promise<boolean>((resolve) => {
      deleteDoc(doc(firestoreInit, 'works', docId))
      resolve(true);
      this.router.navigate(['../app/repositories/works']);
    })
    return response;
  }

  deleteValidation(docId: string): Promise<boolean> {
    const response = new Promise<boolean>((resolve) => {
      deleteDoc(doc(firestoreInit, 'validationRequests', docId))
      resolve(true);
    })
    return response;
  }
  
  async createRequestValidation(request: ValidationRequest): Promise<void> {
    await addDoc(collection(firestoreInit, 'validationRequests'), request);
  }
}