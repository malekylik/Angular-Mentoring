import { User } from '../../models/user/user.model';
import { ActionPayload } from 'src/app/modules/course/models/action-payload';

export enum UserActionTypes {
    GetUserInfo = '[User] GetUserInfo',
    SaveUserInfo = '[User] SaveUserInfo',
    ResetUserInfo = '[User] ResetUserInfo',
    Error = '[User] Error',
}

export class UserActions {
    public static getUserInfo(): ActionPayload<void> {
        return new ActionPayload(UserActionTypes.GetUserInfo);
    }

    public static saveUserInfo(user: User): ActionPayload<User> {
        return new ActionPayload(UserActionTypes.SaveUserInfo, user);
    }

    public static resetUserInfo(): ActionPayload<void> {
        return new ActionPayload(UserActionTypes.ResetUserInfo);
    }

    public static error(payload: any): ActionPayload<any> {
        return new ActionPayload(UserActionTypes.Error, payload);
    }
}
