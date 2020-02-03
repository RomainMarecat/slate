import { Action } from '@ngrx/store';

export enum ELogoutAction {
    Logout = '[User] Logout',
    LogoutSuccess = '[User] Logout Success'
}

/**
 * Dispatch quand on souhaite déconnecter un utilisateur
 */
export class Logout implements Action {
    public readonly type = ELogoutAction.Logout;
}

/**
 * Dispatch quand un utilisateur a été déconnecté avec sucès
 */
export class LogoutSuccess implements Action {
    public readonly type = ELogoutAction.LogoutSuccess;
}

export type LogoutAction = Logout | LogoutSuccess;
