import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { adminsID } from './admin';

@Injectable()
export class AdminGuard implements CanActivate {
  authorized: string[] = [];

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.authorized = adminsID;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean > {
    return this.afAuth.authState
      .take(1)
      .map(authState => {
        return authState && this.authorized.includes(authState.uid);
      })
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/']);
        }
      });
  }
}
