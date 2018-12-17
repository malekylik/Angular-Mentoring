import { ActionReducerMap } from '@ngrx/store';
import { Action } from '@ngrx/store';

import { userReducer } from './user.reducer'; 
import { coursesReducer } from './courses.reducer';
import { State } from '../../models/state.model';

const mainReducer: ActionReducerMap<State, Action> = {
    user: userReducer,
    courses: coursesReducer,
};

export { mainReducer };
