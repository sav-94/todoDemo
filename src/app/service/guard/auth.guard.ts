import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService : AuthService, private router : Router, private afAuth : AngularFireAuth){}
  isLogged: boolean;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.afAuth.authState.subscribe(user => {
        if (user){
         this.isLogged = true;
         console.log('user logged in');
         this.router.navigate(['/show-inserted']);

        }else{
         this.isLogged= false;
         this.router.navigate(['/todo-login']);
        }
     })
     return this.isLogged;
  }

}
