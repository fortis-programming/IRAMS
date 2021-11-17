import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from '../../environments/environment';
import { Router } from '@angular/router';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private route: Router
  ) { }
    
  isAuthenticated() {
    return !!sessionStorage.getItem('_token');
  }
    
  //  LOGIN WITH POPUP FEATURE IN FIREBASE
  loginWithPopup(): void {
    signInWithPopup(auth, provider).then((result) => {
      let credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(GoogleAuthProvider);
      let token = credential?.accessToken;
      const user = result.user;
      console.log(user);
      sessionStorage.setItem('_name', JSON.stringify(user.displayName));
      sessionStorage.setItem('_token', user.refreshToken);
      this.route.navigate(['/app']);
    })
  }
  
  //  SIGN IN WITH CREDENTIALS
  async loginWithCredentials(email: string, password: string): Promise<boolean> {
    let process = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sessionStorage.setItem('_name', JSON.stringify(userCredential.user.displayName));
        sessionStorage.setItem('_token', userCredential.user.refreshToken)
        return true;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
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
      console.log('failed')
      // An error happened.
    });
  }
}