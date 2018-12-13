import { UserActions } from '../actions/user.action';
import { UserActionTypes } from '../actions/user.action';
import { User } from '../../models/user/user.model';
import { BaseUser } from '../../models/user/base-user';
import { SaveUserInfo } from '../actions/user.action'

const initialState: User = new BaseUser('', '', '', '', '', '');

export function userReducer(state: User = initialState, action: UserActions): User {
    switch (action.type) {
        case UserActionTypes.SaveUserInfo: {
            return {
                ...state,
                ...(<SaveUserInfo>action).payload,
            };
        }
        case UserActionTypes.ResetUserInfo: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

