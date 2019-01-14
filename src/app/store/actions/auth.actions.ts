import { User } from '../../models/user/user.model';
import { ActionPayload } from 'src/app/modules/course/models/action-payload';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    Logout = '[Auth] Logout',
    Error = '[Auth] Error',
}

export class AuthActions {
    public static login(user: User): ActionPayload<User> {
        return new ActionPayload(AuthActionTypes.Login, user);
    }

    public static logout(): ActionPayload<void> {
        return new ActionPayload(AuthActionTypes.Logout);
    }

    public static error(payload: any): ActionPayload<any> {
        return new ActionPayload(AuthActionTypes.Error, payload);
    }
}
