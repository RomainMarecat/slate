import { ELoginAction } from '../../user/actions/login.action';
import { ERegisterAction } from '../../user/actions/register.action';
import { FormsErrorsAction } from '../actions/forms-errors.action';
import { FormsErrorsState, initialFormsErrorsState } from '../states/forms-errors.state';

export function formsErrorsReducers(state = initialFormsErrorsState, action: FormsErrorsAction): FormsErrorsState {
    switch (action.type) {
        // Erreur pour l'api register
        case ERegisterAction.RegisterFailure:
            return {
                ...state,
                register: action.payload
            };

        // Erreur pour l'api login
        case ELoginAction.LoginFailure:
            return {
                ...state,
                login: action.payload
            };

        default:
            return state;
    }
}
