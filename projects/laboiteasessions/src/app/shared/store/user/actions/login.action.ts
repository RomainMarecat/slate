import { Action } from '@ngrx/store';
import { LoginRequest } from '../../../interfaces/api/api-login-request';
import { LoginResponse } from '../../../interfaces/api/api-login-response';
import { LoginFailureResponse } from '../../../interfaces/api/api-register-response';

export enum ELoginAction {
    Login = '[User] Login',
    LoginSuccess = '[User] Login Success',
    LoginFailure = '[User] Login Failure',
    LoginCheck = '[User] Login Check',
    LoginCheckSuccess = '[User] Login Check Success',
    LoginCheckFailure = '[User] Login Check Failure',
}

/**
 * Dispatch quand on souhaite connecter un utilisateur
 */
export class Login implements Action {
    public readonly type = ELoginAction.Login;

    constructor(public payload: LoginRequest) {
    }
}

/**
 * Dispatch quand un utilisateur a été connecté avec succès
 */
export class LoginSuccess implements Action {
    public readonly type = ELoginAction.LoginSuccess;

    constructor(public payload: LoginResponse) {
    }
}

/**
 * Dispatch quand un utilisateur n'a pas réussi à se connecter
 */
export class LoginFailure implements Action {
    public readonly type = ELoginAction.LoginFailure;

    constructor(public payload: LoginFailureResponse) {
    }
}

/**
 * Dispatch quand on souhaite vérifier qu'un utilisateur connecté et son JWT sont en mémoire
 */
export class LoginCheck implements Action {
    public readonly type = ELoginAction.LoginCheck;
}

/**
 * Dispatch quand le login d'un utilisateur a été vérifié avec succès
 */
export class LoginCheckSuccess implements Action {
    public readonly type = ELoginAction.LoginCheckSuccess;

    constructor(public payload: LoginResponse) {
    }
}

/**
 * Dispatch que le login d'un utilisateur n'a pas pu être vérifié
 */
export class LoginCheckFailure implements Action {
    public readonly type = ELoginAction.LoginCheckFailure;
}


export type LoginResult = LoginSuccess | LoginFailure;
export type LoginAction = Login | LoginResult;

export type LoginCheckResult = LoginCheckSuccess | LoginCheckFailure;
export type LoginCheckAction = LoginCheck | LoginCheckResult;
