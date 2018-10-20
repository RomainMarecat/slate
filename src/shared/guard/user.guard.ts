import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from '../popup/alert.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        take(1),
        map(authState => !!authState),
        tap(authenticated => {
          if (!authenticated) {
            this.alertService.toast('snackbar.guard.unauthenticated');
            this.router.navigate(['/']);
          }
        })
      );
  }
}
