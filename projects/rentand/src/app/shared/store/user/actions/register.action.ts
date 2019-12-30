import { Action } from '@ngrx/store';
import { RegisterRequest } from '../../../interfaces/api/api-register-request';
import { RegisterFailureResponse } from '../../../interfaces/api/api-register-response';

export enum ERegisterAction {
  Register = '[User] Register',
  RegisterSuccess = '[User] Register Success',
  RegisterFailure = '[User] Register Failure'
}

/**
 * Dispatch quand on souhaite inscrire un utilisateur
 */
export class Register implements Action {
  public readonly type = ERegisterAction.Register;

  constructor(public payload: RegisterRequest) {
  }
}

/**
 * Dispatch quand un utilisateur a été inscrit avec succès
 */
export class RegisterSuccess implements Action {
  public readonly type = ERegisterAction.RegisterSuccess;

  constructor(public payload: string) {
  }
}

/**
 * Dispatch quand un utilisateur n'a pas pu être inscrit
 */
export class RegisterFailure implements Action {
  public readonly type = ERegisterAction.RegisterFailure;

  constructor(public payload: RegisterFailureResponse) {
  }
}

export type RegisterResult = RegisterSuccess | RegisterFailure;
export type RegisterAction = Register | RegisterResult;
