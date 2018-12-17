import { UserActions, UserActionTypes, SaveUserInfo } from '../actions/user.actions';
import { User } from '../../models/user/user.model';
import { BaseUser } from '../../models/user/base-user';

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
