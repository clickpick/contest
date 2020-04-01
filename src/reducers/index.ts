import { combineReducers } from 'redux';

import mainView, { mainViewInitialState } from './main-view';
import createGoalView, { createGoalViewInitialState } from './create-goal-view';
import user, { userInitialState } from './user';
import goals, { goalsInitialState } from './goals';
import startedGoals, { startedGoalsInitialState } from './started-goals';

const rootReducer = combineReducers({
    mainView,
    createGoalView,
    user,
    goals,
    startedGoals
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

export const initialStore: AppState = {
    mainView: mainViewInitialState,
    createGoalView: createGoalViewInitialState,
    user: userInitialState,
    goals: goalsInitialState,
    startedGoals: startedGoalsInitialState
};