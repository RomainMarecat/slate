import { LoginFailureResponse, RegisterFailureResponse } from '../../../interfaces/api/api-register-response';

export interface FormsErrorsState {
  register: RegisterFailureResponse;
  login: LoginFailureResponse;
}

export const initialFormsErrorsState: FormsErrorsState = {
  register: null,
  login: null
};
