import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  private code: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private translateService: TranslateService,
              private toastService: ToastService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (state && state.url && (state.url.lastIndexOf('=') + 1) > 0) {
    //  this.code = state.url.substr(state.url.lastIndexOf('=') + 1);
    // }
    // if (this.code) {
    //  this.authenticationService.loginrentand(this.code)
    //    .subscribe((objectToken) => {
    //        this.code = null;
    //        this.authenticationService.saveJwtToken(objectToken);
    //        this.router.navigate(['/']);
    //        return true;
    //      },
    //      (error) => {
    //        if (typeof error.status !== 'undefined' && error.status === 0) {
    //          this.toastService.emitToast({
    //            message: this.translateService.instant('login.server_internal_error'),
    //            classes: 'red'
    //          });
    //        } else {
    //          this.toastService.emitToast({
    //            message: this.translateService.instant('login.connection_error'),
    //            classes: 'orange'
    //          });
    //        }
    //        this.router.navigate(['/login']);
    //        return of(false);
    //      });
    // } else {
    //  this.toastService.emitToast({
    //    message: this.translateService.instant('guard.token_expired'),
    //    classes: 'orange'
    //  });
    //
    //  this.router.navigate(['/login']);
    //  return false;
    // }
    return true;
  }
}
