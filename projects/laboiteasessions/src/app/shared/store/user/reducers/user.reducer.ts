import { ELoginAction, LoginAction, LoginCheckAction } from '../actions/login.action';
import { ELogoutAction, LogoutAction } from '../actions/logout.action';
import { ERegisterAction, RegisterAction } from '../actions/register.action';
import { EGetUserAction, GetUserAction, UserAction } from '../actions/user.action';
import { initialUserState, UserState } from '../states/user.state';

export function getUserReducers(state: UserState, action: GetUserAction): UserState {
  switch (action.type) {
    case EGetUserAction.GetUser:
      return state;

    case EGetUserAction.GetUserSuccess:
      return {
        ...state,
        ...{
          user: action.payload
        }
      };

    case EGetUserAction.GetUserFailure:
      return state;
  }
}

export function loginCheckReducers(state: UserState, action: LoginCheckAction): UserState {
  switch (action.type) {
    case ELoginAction.LoginCheck:
      return {
        loginChecked: false,
        loggedIn: false
      };

    case ELoginAction.LoginCheckSuccess:
      return {
        loginChecked: true,
        loggedIn: true,
        jwt: action.payload.token
      };

    case ELoginAction.LoginCheckFailure:
      return {
        loginChecked: true,
        loggedIn: false
      };
  }
}

export function loginReducers(state: UserState, action: LoginAction): UserState {
  switch (action.type) {
    case ELoginAction.Login:
      return {
        loginChecked: false,
        loggedIn: false,
        requestInProgress: true
      };

    case ELoginAction.LoginSuccess:
      return {
        loginChecked: true,
        loggedIn: true,
        requestInProgress: false,
        jwt: action.payload.token
      };

    case ELoginAction.LoginFailure:
      return {
        loginChecked: true,
        loggedIn: false,
        requestInProgress: false,
        user: false
      };
  }
}

export function registerReducers(state: UserState, action: RegisterAction): UserState {
  switch (action.type) {
    case ERegisterAction.Register:
      return {
        loginChecked: true,
        loggedIn: false,
        requestInProgress: true
      };

    case ERegisterAction.RegisterSuccess:
      return {
        loginChecked: true,
        loggedIn: true,
        requestInProgress: false,
        jwt: action.payload
      };

    case ERegisterAction.RegisterFailure:
      return {
        loginChecked: true,
        loggedIn: false,
        requestInProgress: false
      };
  }
}

export function logoutReducers(state: UserState, action: LogoutAction): UserState {
  switch (action.type) {
    case ELogoutAction.Logout:
      return state;

    case ELogoutAction.LogoutSuccess:
      return {
        loginChecked: true,
        loggedIn: false
      };
  }
}

export function userReducers(state = initialUserState, action: UserAction): UserState {
  switch (action.type) {
    // ---------- ACTIONS LoginCheck ----------
    case ELoginAction.LoginCheck:
    case ELoginAction.LoginCheckSuccess:
    case ELoginAction.LoginCheckFailure:
      return loginCheckReducers(state, action);

    // ---------- ACTIONS Login ----------
    case ELoginAction.Login:
    case ELoginAction.LoginSuccess:
    case ELoginAction.LoginFailure:
      return loginReducers(state, action);

    // ---------- ACTIONS Register ----------
    case ERegisterAction.Register:
    case ERegisterAction.RegisterSuccess:
    case ERegisterAction.RegisterFailure:
      return registerReducers(state, action);

    case ELogoutAction.Logout:
    case ELogoutAction.LogoutSuccess:
      return logoutReducers(state, action);

    case EGetUserAction.GetUser:
    case EGetUserAction.GetUserSuccess:
    case EGetUserAction.GetUserFailure:
      return getUserReducers(state, action);

    default:
      return state;
  }
}
