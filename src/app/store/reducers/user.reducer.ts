import { UserActionTypes } from '../actions/user.actions';
import { User } from '../../models/user/user.model';
import { BaseUser } from '../../models/user/base-user';
import { ActionPayload } from 'src/app/modules/course/models/action-payload';

type ActionType = User;
const initialState: User = new BaseUser('', '', '', '', '', '');

export function userReducer(state: User = initialState, action: ActionPayload<ActionType>): User {
    switch (action.type) {
        case UserActionTypes.SaveUserInfo: {
            return {
                ...state,
                ...<User>action.payload,
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
