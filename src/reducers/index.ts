import { combineReducers } from 'redux';

import mainView, { mainViewInitialState } from './main-view';
import user, { userInitialState } from './user';
import goals, { goalsInitialState } from './goals';

const rootReducer = combineReducers({
    mainView,
    user,
    goals
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

export const initialStore: AppState = {
    mainView: mainViewInitialState,
    user: userInitialState,
    goals: goalsInitialState
};