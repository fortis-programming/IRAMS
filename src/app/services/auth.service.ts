import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup, getAuth, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { firebaseConfig } from '../../environments/environment';
import { Router } from '@angular/router';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private route: Router,
  ) { }

  isAuthenticated() {
    return !!sessionStorage.getItem('_token');
  }

  async loginWithPopup(): Promise<boolean> {
    let process = await signInWithPopup(auth, provider)
      .then((result) => {
        let credential = GoogleAuthProvider.credentialFromResult(result);
        let token = credential?.accessToken;
        const user = result.user;
        this.setSessions([user.refreshToken, JSON.parse(JSON.stringify(user.uid))]);
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        return emailVerified;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        return false;
      })
    return process;
  }
  
  //  RESET PASSWORD
  resetPassword(userEmail: string): void {
    sendPasswordResetEmail(auth, userEmail).then((link) => {
      console.log('Recovery link has been sent');
    });
  }
  changePassword(newPassword: string): void { 
  }

  //  SIGN IN WITH CREDENTIALS
  async loginWithCredentials(email: string, password: string): Promise<boolean> {
    let process = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sessionStorage.setItem('photo', JSON.parse(JSON.stringify(userCredential.user.photoURL)));
        sessionStorage.setItem('_email', JSON.parse(JSON.stringify(userCredential.user.email)));
        this.setSessions([userCredential.user.refreshToken, JSON.parse(JSON.stringify(userCredential.user.uid))]);
        return true;
      }).catch((error) => {
        return false;
      });
    return await process;
  }

  //  LOGOUT USER
  logout(): void {
    signOut(auth).then(() => {
      // Sign-out successful.
      sessionStorage.clear();
      this.route.navigate(['/login']);
    }).catch((error) => {
      // An error happened.
    });
  }

  //  SET SESSIONS FOR YOUR SYSTEM TO REUSE IT AGAIN
  setSessions(user: Array<string>): void {
    sessionStorage.setItem('_token', user[0]);
    sessionStorage.setItem('_uid', user[1]);
  }
}
