import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../../../interfaces/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { EGetUserAction, GetUser, GetUserFailure, GetUserResult, GetUserSuccess } from '../actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class GetUserEffect {
  /**
   * Exécuté lors du dispatch d'une action de type GetUser.
   * Tente de récupérer l'utilisateur courant et dispatch une action de type GetUserSuccess ou GetUserFailure
   * selon le résultat.
   */
  @Effect()
  getUser$: Observable<GetUserResult> = this.actions$.pipe(
    ofType<GetUser>(EGetUserAction.GetUser),
    // On effectue la requête de GetUser
    switchMap(() => {
      return this.authenticationService
        .getUser()
        .pipe(
          catchError((err: HttpErrorResponse) => of(err))
        );
    }),
    // On enregistre l'utilisateur
    switchMap((userOrError: User | HttpErrorResponse) => {
      if (userOrError instanceof HttpErrorResponse) {
        return of(userOrError as HttpErrorResponse);
      }

      return this.authenticationService
        .saveUser(userOrError as User)
        .pipe(
          map(() => userOrError as User)
        );
    }),
    // On dispatch une action GetUserSuccess
    switchMap((userOrError: User | HttpErrorResponse) => {
      if (userOrError instanceof HttpErrorResponse) {
        return of(new GetUserFailure());
      }

      return of(new GetUserSuccess(userOrError as User));
    })
  );

  constructor(private actions$: Actions,
              private authenticationService: AuthenticationService) {
  }
}
