import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { ELogoutAction, Logout, LogoutSuccess } from '../actions/logout.action';

@Injectable({
  providedIn: 'root'
})
export class LogoutEffect {
  /**
   * Exécuté lors du dispatch d'une action de type Logout.
   * Déconnecte un utilisateur et dispatch LogoutSuccess.
   */
  @Effect()
  logout$: Observable<LogoutSuccess> = this.actions$.pipe(
    ofType<Logout>(ELogoutAction.Logout),
    // On effetue la déconnexion
    switchMap(() => this.authenticationService.logout()),
    // On dispatch l'action LogoutSuccess
    switchMap(() => of(new LogoutSuccess()))
  );

  /**
   * Exécuté lors du dispatch d'une action de type LogoutSuccess.
   * Ne dispatch pas d'action et ne sert qu'à rediriger vers l'accueil déconnectée
   */
  @Effect({dispatch: false})
  logoutSuccess$: Observable<any> = this.actions$.pipe(
    ofType<LogoutSuccess>(ELogoutAction.LogoutSuccess)
  );

  constructor(private actions$: Actions,
              private authenticationService: AuthenticationService) {
  }
}
