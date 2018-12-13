import { AuthActions } from '../actions/auth.actions';
import { AuthActionTypes } from '../actions/auth.actions';

import { User } from '../../models/user/user.model';
import { BaseUser } from '../../models/user/base-user';
import { Login } from '../actions/auth.actions';

const initialState: User = new BaseUser('', '', '', '', '', '');

export function userReducer(state: User = initialState, action: AuthActions): User {
    switch (action.type) {
        case AuthActionTypes.SaveUserInfo: {
            return {
                ...state,
                ...(<Login>action).payload,
            };
        }
        case AuthActionTypes.ResetUserInfo: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

