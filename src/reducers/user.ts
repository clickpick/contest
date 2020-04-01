import { createSelector } from 'reselect';
import { getEntitiesStartedGoalsSelector } from './started-goals';
import {
    ActionTypes,
    User, UserState, Goals,
    UserAuthLoad, UserAuthSuccess, UserAuthFailure, StartedGoalCreated
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type UserReducerActions = UserAuthLoad | UserAuthSuccess | UserAuthFailure | StartedGoalCreated;

const initialData: User | null = null;

export const userInitialState: UserState = {
    pending: initialPending,
    error: initialError,
    data: initialData
};

function data(state = initialData, action: UserReducerActions): User | null {
    switch (action.type) {
        case ActionTypes.USER_AUTH_SUCCESS:
            return action.payload.result;

        case ActionTypes.STARTED_GOALS_CREATED:
            return state && { ...state, startedGoalId: action.payload.result };

        default:
            return state;
    }
}

export default function userReducer(state = userInitialState, action: UserReducerActions): UserState {
    return {
        pending: isPending<UserReducerActions>(state.pending, action, [ActionTypes.USER_AUTH_REQUEST, ActionTypes.USER_AUTH_SUCCESS, ActionTypes.USER_AUTH_FAILURE]),
        error: isError<UserReducerActions>(state.error, action, ActionTypes.USER_AUTH_FAILURE),
        data: data(state.data, action)
    };
}

// Selectors
export const getUserSelector = (state: AppState) => state.user;
export const getUserDataWithSelectedGoalSelector = createSelector<AppState, Goals, User | null, any>(
    [getEntitiesStartedGoalsSelector, (state: AppState): User | null => state.user.data],
    (goals, data) => data && { ...data, selectedGoal: data.startedGoalId && goals[data.startedGoalId] }
);
export const getUserWithStartedGoalSelected = createSelector(
    [getUserDataWithSelectedGoalSelector, getUserSelector],
    (data, state) => ({ ...state, data })
);