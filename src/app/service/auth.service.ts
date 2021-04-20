import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CanActivate, Router } from '@angular/router';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  userData: any; //per salvare dati log utente

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }



    doSignup(email : string, password : string){
      this.afAuth.createUserWithEmailAndPassword(email,password)
      .then(value => {
        console.log('Success',value);
        this.SetUserData(value.user);
      })
      .catch(err => {
        console.log('Something wrong:', err.message);
      })
     }

     doLogin(email : string, password : string){
       this.afAuth
       .signInWithEmailAndPassword(email, password)
       .then(value => {
         console.log('Nice, it worked!');
         this.SetUserData(value.user);

         this.router.navigate(['/show-inserted']);
        })
       .catch(err => {
         console.log('Something went wrong:',err.message);

       });
     }

     get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

     doLogout() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        console.log(localStorage.user);
        this.router.navigate(['/todo-login']);
      })
     }

     SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      return userRef.set(userData, {
        merge: true
      })
    }

}
