import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  code: string;
  redirectRoute = '';

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private translateService: TranslateService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (state && state.url && (state.url.lastIndexOf('=') + 1) > 0) {
    //  this.code = state.url.substr(state.url.lastIndexOf('=') + 1);
    //  this.redirectRoute = this.getParameterByName('redirect_to', state.url);
    // }
    //
    //
    // this.authenticationService.loginrentand(this.code)
    //  .subscribe((objectToken) => {
    //      this.code = null;
    //      this.authenticationService.saveJwtToken(objectToken);
    //      this.authenticationService.setAuthenticationStatus(true);
    //      return this.accessToFavoriteRoute();
    //    },
    //    (error) => {
    //      this.authenticationService.setAuthenticationStatus(false);
    //
    //      if (typeof error.status !== 'undefined' && error.status === 0) {
    //        this.toastService.emitToast({
    //          message: this.translateService.instant('login.server_internal_error'),
    //          classes: 'red'
    //        });
    //      } else {
    //        this.toastService.emitToast({
    //          message: this.translateService.instant('login.connection_error'),
    //          classes: 'orange'
    //        });
    //      }
    //      return this.accessToFavoriteRoute();
    //
    //    });

    return true;
  }

  public getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}
