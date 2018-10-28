import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { adminsID } from './admin';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../popup/alert.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  authorized: string[] = [];

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private translate: TranslateService,
              private alertService: AlertService) {
    this.authorized = adminsID;
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        take(1),
        map(authState => {
          return authState && this.authorized.includes(authState.uid);
        }),
        tap(authenticated => {
          if (!authenticated) {
            this.alertService.show('admin.authentication.needed');
            this.router.navigate(['/']);
          }
        })
      );
  }
}
