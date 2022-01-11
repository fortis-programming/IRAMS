import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { getDatabase } from '@firebase/database';
import { getFirestore } from '@firebase/firestore';
import { firebaseConfig } from 'src/environments/environment';

const firebaseInit = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseInit);
export const database = getDatabase();

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor() { }
}
