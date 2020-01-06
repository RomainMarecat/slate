import { Action } from '@ngrx/store';
import { LoginFailureResponse, RegisterFailureResponse } from '../../../interfaces/api/api-register-response';
import { ELoginAction } from '../../user/actions/login.action';
import { ERegisterAction } from '../../user/actions/register.action';

export class FormsErrorsRegisterAction implements Action {
  public readonly type = ERegisterAction.RegisterFailure;

  constructor(public payload: RegisterFailureResponse) {
  }
}

export class FormsErrorsLoginAction implements Action {
  public readonly type = ELoginAction.LoginFailure;

  constructor(public payload: LoginFailureResponse) {
  }
}

export type FormsErrorsAction = FormsErrorsRegisterAction | FormsErrorsLoginAction;
