import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { ref, set } from 'firebase/database';
import { AccountModel } from '../_shared/models/account.model';

import { SignupRequest } from '../_shared/models/requests/signup.request';
import { database } from './firebase.service';

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

  constructor(
  ) { }

  async createAccount(userObject: SignupRequest): Promise<boolean> {
    const authentication = getAuth();
    let status = false;
    await createUserWithEmailAndPassword(authentication, userObject.email, userObject.password)
      .then((userCredentials) => {
        console.log(userCredentials.user.uid);
        this.accountModel.email = userObject.email;
        this.accountModel.studentId = userObject.studentId;
        this.accountModel.name = userObject.name;
        this.accountModel.displayName = userObject.name;
        this.accountModel.photoUrl = '../../assets/images/user.png'; // SET DEFAULT PROFILE
        this.createUserMetadata(userCredentials.user.uid, this.accountModel);
        status = true;
      })
      .catch((error) => {
        const errorCode = error.code;
        status = false;
        console.log(error.message)
      })
      return status;
  }

  async createUserMetadata(uid: string, userObject: AccountModel): Promise<void> {
    const userRef = ref(database, 'usersData/' + uid);
    await set(userRef, userObject);
    console.log('success')
  }
}
