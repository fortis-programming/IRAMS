import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { ref, set, getDatabase } from 'firebase/database';
import { AccountModel } from '../_shared/models/account.model';

import { SignupRequest } from '../_shared/models/requests/signup.request';
import { database } from './firebase.service';

const databaseReference = ref(getDatabase());

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  accountModel: AccountModel = {
    email: '',
    studentId: '',
    name: '',
    displayName: '',
    photoUrl: ''
  }
  
  constructor() { }
  
  async createAccount(userObject: SignupRequest): Promise<void> {
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, userObject.email, userObject.password)
      .then((userCredentials) => {
        console.log(userCredentials.user.uid);
        this.accountModel.email = userObject.email;
        this.accountModel.studentId = userObject.studentId;
        this.accountModel.name = userObject.name;
        this.accountModel.displayName = userObject.name;
        this.accountModel.photoUrl = '../../assets/images/user.png';
        this.createUserMetadata(userCredentials.user.uid, this.accountModel)
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message)
      })
  }
  
  async createUserMetadata(uid: string, userObject: AccountModel): Promise<void> {
    const userRef = ref(database, 'usersData/' + uid);
    set(userRef, userObject);
  }
}
