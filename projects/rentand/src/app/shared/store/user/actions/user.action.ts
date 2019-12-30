import { Action } from '@ngrx/store';
import { User } from '../../../interfaces/user';
import { LoginAction, LoginCheckAction } from './login.action';
import { LogoutAction } from './logout.action';
import { RegisterAction } from './register.action';

export enum EGetUserAction {
    GetUser = '[User] Get User',
    GetUserSuccess = '[User] Get User Success',
    GetUserFailure = '[User] Get User Failure'
}

/**
 * Dispatch quand on souhaite récupérer l'utilisateur courant
 */
export class GetUser implements Action {
    public readonly type = EGetUserAction.GetUser;
}

/**
 * Dispatch l'utilisateur courant a été récupéré avec succès
 */
export class GetUserSuccess implements Action {
    public readonly type = EGetUserAction.GetUserSuccess;

    constructor(public payload: User) {
    }
}

/**
 * Dispatch l'utilisateur courant n'a pas pu être récupéré
 */
export class GetUserFailure implements Action {
    public readonly type = EGetUserAction.GetUserFailure;
}

export type GetUserResult = GetUserSuccess | GetUserFailure;
export type GetUserAction = GetUser | GetUserResult;

export type UserAction = GetUserAction
    | LoginAction
    | LoginCheckAction
    | LogoutAction
    | RegisterAction;
