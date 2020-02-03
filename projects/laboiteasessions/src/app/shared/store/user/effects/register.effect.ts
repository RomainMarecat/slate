import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { RegisterRequest } from '../../../interfaces/api/api-register-request';
import { RegisterFailureResponse, RegisterResponse } from '../../../interfaces/api/api-register-response';
import { AuthenticationService } from '../../../services/authentication.service';
import { StorageService } from '../../../services/storage.service';
import {
    ERegisterAction,
    Register,
    RegisterFailure,
    RegisterResult,
    RegisterSuccess
} from '../actions/register.action';
import { GetUser } from '../actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class RegisterEffect {
  /**
   * Exécuté lors du dispatch d'une action de type Register.
   * Tente d'inscrire un utilisateur et dispatch RegisterSaveJWT ou RegisterFailure selon le résultat.
   */
  @Effect()
  register$: Observable<RegisterResult> = this.actions$.pipe(
    ofType<Register>(ERegisterAction.Register),
    // On récupère les valeurs avec lesquelles inscrire l'utilisateur
    map((action: Register) => action.payload),
    // On effectue la requête d'inscription
    switchMap((registerRequest: RegisterRequest) => {
      return fromPromise(this.storageService.getItem('createToken'))
        .pipe(
          switchMap((createToken: string) => {
            return this.authenticationService
              .register({...registerRequest, ...{createToken}})
              .pipe(
                // En cas d'erreur, on dispatch une HttpErrorResponse
                catchError((err) => of(err))
              );
          })
        );
    }),
    // On retire le numéro de carte et le token de l'indexDB et
    // on dispatch une action RegisterSaveJWT
    switchMap((registerResponse: RegisterResponse | HttpErrorResponse) => {
      // En cas d'erreur, on dispatch une action RegisterFailure
      if (registerResponse instanceof HttpErrorResponse) {
        return of(new RegisterFailure(registerResponse.error));
      }

      return from(this.storageService.removeItem('createToken'))
        .pipe(
          // On fait passer le JWT à l'opérateur suivant
          map(() => registerResponse.token),
          switchMap((jwt: string) => {
            return this.authenticationService.saveJWT(jwt)
              .pipe(map(() => jwt));
          }),
          switchMap((jwt: string) => of(new RegisterSuccess(jwt)))
        );
    })
  );

  /**
   * Exécuté lors du dispatch d'une action de type RegisterSuccess.
   * Ne dispatch pas d'action et ne sert qu'à rediriger vers l'accueil connectée
   */
  @Effect()
  registerSuccess$: Observable<GetUser> = this.actions$.pipe(
    ofType<RegisterSuccess>(ERegisterAction.RegisterSuccess),
    // On redirige vers le questionnaire
    tap(() => this.router.navigate(['/'])),
    // On dispatch GetUser
    switchMap(() => [
      new GetUser()
    ])
  );

  @Effect({dispatch: false})
  registerFailure$: Observable<any> = this.actions$.pipe(
    ofType<RegisterFailure>(ERegisterAction.RegisterFailure),
    map<RegisterFailure, RegisterFailureResponse>((action: RegisterFailure) => action.payload)
  );

  constructor(private actions$: Actions,
              private authenticationService: AuthenticationService,
              private router: Router,
              private storageService: StorageService) {
  }
}
