import { combineReducers } from 'redux';

import mainView, { mainViewInitialState } from './main-view';
import createGoalView, { createGoalViewInitialState } from './create-goal-view';
import user, { userInitialState } from './user';
import goals, { goalsInitialState } from './goals';

const rootReducer = combineReducers({
    mainView,
    createGoalView,
    user,
    goals
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

export const initialStore: AppState = {
    mainView: mainViewInitialState,
    createGoalView: createGoalViewInitialState,
    user: userInitialState,
    goals: goalsInitialState
};