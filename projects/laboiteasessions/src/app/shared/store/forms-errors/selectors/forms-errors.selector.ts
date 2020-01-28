import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormsErrorsState } from '../states/forms-errors.state';

export const selectFormsErrors = (state: AppState) => state.formsErrors;

export const selectRegisterFormsErrors = createSelector(
  selectFormsErrors,
  (state: FormsErrorsState) => state.register
);

export const selectLoginFormsErrors = createSelector(
  selectFormsErrors,
  (state: FormsErrorsState) => state.login
);
