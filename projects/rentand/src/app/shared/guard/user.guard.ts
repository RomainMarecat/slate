import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class UserGuard implements CanActivate {

  private code: string;

  constructor(private authService: AuthService,
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
    //  this.authService.loginrentand(this.code)
    //    .subscribe((objectToken) => {
    //        this.code = null;
    //        this.authService.saveJwtToken(objectToken);
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
    // } else if (this.authService.isAuthenticated()) {
    //  return true;
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
