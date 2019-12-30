import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skipWhile, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AppState } from '../store/app.state';
import { selectUser } from '../store/user/selectors/user.selector';
import { UserState } from '../store/user/states/user.state';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectUser)
      .pipe(
        skipWhile((userState: UserState) => !userState.loginChecked && !userState.requestInProgress),
        take(1),
        switchMap((userState: UserState) => {
          if (userState.jwt) {
            // On ajoute le header à la requête et on passe à l'intercepteur suivant
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${userState.jwt}`
              }
            });
          }

          return next.handle(req);
        })
      );
  }
}
