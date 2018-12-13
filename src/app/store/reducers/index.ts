import { ActionReducerMap } from '@ngrx/store';
import { Action } from '@ngrx/store';

import { userReducer } from './user.reducer'; 
import { State } from '../../models/state.model';

const mainReducer: ActionReducerMap<State, Action> = {
    user: userReducer,
};

export { mainReducer };
