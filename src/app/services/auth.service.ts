import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, EmailAuthProvider, signInWithPopup, linkWithCredential, getAuth, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword, User } from "firebase/auth";
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

  async updateUserPassword(oldPassword: string, password: string): Promise<boolean> {
    const user = auth.currentUser;
    this.loginWithCredentials(JSON.stringify(user?.email).toString(), oldPassword).then(() => {
      updatePassword(user as User, password).then(() => {
        this.loginWithCredentials(JSON.stringify(user?.email), password);
      }).catch((error) => {
        console.log(error);
      }).catch((error) => {
        console.log(error)
      })
    });
    return true;
  }

  //  SIGN IN WITH CREDENTIALS
  async loginWithCredentials(email: string, password: string): Promise<boolean> {
    const credential = EmailAuthProvider.credential(email, password);
    console.log(credential)

    let process = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        linkWithCredential(auth.currentUser as User, credential)
          .then((usercred) => {
            const user = usercred.user;
            console.log("Account linking success", user);
          }).catch((error) => {
            console.log("Account linking error", error);
          });



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
