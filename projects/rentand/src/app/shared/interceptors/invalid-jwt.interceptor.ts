import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { Logout } from '../store/user/actions/logout.action';

@Injectable({
  providedIn: 'root'
})
export class InvalidJwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        // On catch une potentielle erreur générée par la requête
        catchError((error: HttpErrorResponse) => {
          // Si on a affaire avec une 401 et que le message correspond à un token invalide...
          if (error.status === 401) {
            // ... alors on dispatch une action Logout
            this.store.dispatch(new Logout());
          }

          // Dans tous les cas on renvoie un throwError pour que le flux puisse poursuivre
          return throwError(error);
        })
      );
  }
}
