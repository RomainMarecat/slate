import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginRequest } from '../../../interfaces/api/api-login-request';
import { LoginResponse } from '../../../interfaces/api/api-login-response';
import { User } from '../../../interfaces/user';
import { AuthenticationService } from '../../../services/authentication.service';

import {
  ELoginAction,
  Login,
  LoginCheck,
  LoginCheckFailure,
  LoginCheckResult,
  LoginCheckSuccess,
  LoginFailure,
  LoginResult,
  LoginSuccess,
} from '../actions/login.action';
import { GetUser } from '../actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class LoginEffect {
  /**
   * Exécuté lors du dispatch d'une action de type Login.
   * Tente d'authentifier un utilisateur et dispatch LoginSuccess et LoginFailure selon le résultat.
   */
  @Effect()
  login$: Observable<LoginResult> = this.actions$.pipe(
    ofType<Login>(ELoginAction.Login),
    // On récupère les infos de connexion
    map((action: Login) => action.payload),
    // On effectue la requête de login
    switchMap((loginRequest: LoginRequest) => {
      return this.authenticationService.loginCheck(loginRequest)
        .pipe(
          // En cas d'erreur, on dispatche l'HttpErrorResponse pour entrer dans le login failure
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorResponse);
          })
        );
    }),
    // On dispatch une action LoginSuccess
    switchMap((loginResponse: LoginResponse | HttpErrorResponse) => {

      // En cas d'erreur, on dispatch une action LoginFailure
      if (loginResponse instanceof HttpErrorResponse) {
        return of(new LoginFailure(loginResponse.error));
      }

      return of(new LoginSuccess(loginResponse));
    })
  );

  /**
   * Exéctué lors du dispatch d'une action de type LoginSuccess.
   * Ne dispatch pas d'action et sert juste à la redirection post-connexion
   */
  @Effect()
  loginSuccess$: Observable<GetUser> = this.actions$.pipe(
    ofType<LoginSuccess>(ELoginAction.LoginSuccess),
    map((action: LoginSuccess) => action.payload),
    // On enregistre le JWT dans l'indexedDB, on redirige vers la home connectée et on dispatch GetUser
    switchMap((loginResponse: LoginResponse) => {
      return this.authenticationService
        .saveJWT(loginResponse.token)
        .pipe(
          tap(() => this.router.navigate([`/`])),
          switchMap(() => [
            new GetUser(),
          ])
        );
    })
  );

  /**
   * Exéctué lors du dispatch d'une action de type LoginFailure.
   * Ne dispatch pas d'action et sert juste à forcer le logout
   */
  @Effect({dispatch: false})
  loginFailure$: Observable<any> = this.actions$.pipe(
    ofType<LoginFailure>(ELoginAction.LoginFailure),
    // On force la déconnexion
    tap(() => this.authenticationService.logout())
  );

  /**
   * Exécuté lors du dispatch d'une action de type LoginCheck.
   * Vérifie si un utilisateur s'est déjà connecté auparavant sur le navigateur et
   * dispatch LoginSuccess ou LoginFailure selon le résultat.
   */
  @Effect()
  loginCheck$: Observable<LoginCheckResult> = this.actions$.pipe(
    ofType<LoginCheck>(ELoginAction.LoginCheck),
    // On récupère l'utilisateur actuel
    switchMap(() => this.authenticationService.getAuthentication()),
    // S'il n'y en a pas, on déclanche une erreur, sinon on récupère le JWT
    switchMap((user: User) => {
      if (user === null) {
        return throwError({});
      }

      return from(this.authenticationService.getJWT())
        .pipe(
          switchMap((token: string) => {
            if (token === null) {
              return throwError({});
            }

            return of({user, token});
          })
        );
    }),
    // On dispatch une action LoginSuccess
    switchMap((successPayload: {user: User, token: string}) => of(new LoginCheckSuccess(successPayload))),
    // En cas d'erreur, on dispatch une action LoginFailure
    catchError(() => of(new LoginCheckFailure()))
  );

  /**
   * Exécuté lors du dispatch d'une action de type LoginCheckSuccess.
   * Récupère l'utilisateur depuis l'API
   */
  @Effect()
  loginCheckSuccess$: Observable<GetUser> = this.actions$.pipe(
    ofType<LoginCheckSuccess>(ELoginAction.LoginCheckSuccess),
    // On dispatch GetUser
    switchMap(() => [
      new GetUser()
    ])
  );

  constructor(private actions$: Actions,
              private authenticationService: AuthenticationService,
              private jwtHelperService: JwtHelperService,
              private router: Router) {
  }
}
