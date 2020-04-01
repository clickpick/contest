import { createSelector } from 'reselect';
import { getGoalsEntitiesSelector } from './goals';
import {
    ActionTypes,
    StartedGoalIds, StartedGoals, StartedGoalsState,
    StartedGoalsLoad, StartedGoalsSuccess, StartedGoalsFailure, StartedGoalCreated
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type StartedGoalsReducerActions = StartedGoalsLoad | StartedGoalsSuccess | StartedGoalsFailure | StartedGoalCreated;

const initialGoalIds: StartedGoalIds = null;
const initialGoals: StartedGoals = {};

export const startedGoalsInitialState: StartedGoalsState = {
    pending: initialPending,
    error: initialError,
    goalIds: initialGoalIds,
    goals: initialGoals
};

function goalIds(state = initialGoalIds, action: StartedGoalsReducerActions): StartedGoalIds {
    switch (action.type) {
        case ActionTypes.STARTED_GOALS_SUCCESS:
            return action.payload.result;

        case ActionTypes.STARTED_GOALS_CREATED:
            return (Array.isArray(state)) ? [...state, action.payload.result] : [action.payload.result];

        default:
            return state;
    }
}

function goals(state = initialGoals, action: StartedGoalsReducerActions): StartedGoals {
    switch (action.type) {
        case ActionTypes.STARTED_GOALS_SUCCESS:
            return action.payload.entities.startedGoals;
        
        case ActionTypes.STARTED_GOALS_CREATED:
            return {
                ...state,
                ...action.payload.entities.startedGoals
            };

        default:
            return state;
    }
}

export default function userReducer(state = startedGoalsInitialState, action: StartedGoalsReducerActions): StartedGoalsState {
    return {
        pending: isPending<StartedGoalsReducerActions>(state.pending, action, [ActionTypes.STARTED_GOALS_REQUEST, ActionTypes.STARTED_GOALS_SUCCESS, ActionTypes.STARTED_GOALS_FAILURE]),
        error: isError<StartedGoalsReducerActions>(state.error, action, ActionTypes.STARTED_GOALS_FAILURE),
        goalIds: goalIds(state.goalIds, action),
        goals: goals(state.goals, action)
    };
}

// Selectors
export const getStartedGoalsSelector = (state: AppState) => state.startedGoals;
export const getEntitiesStartedGoalsSelector = createSelector(
    [getGoalsEntitiesSelector, (state: AppState) => state.startedGoals.goals],
    (goals, startedGoals) => Object.keys(startedGoals).reduce((acc, goalId) => ({
        ...acc,
        [goalId]: {
            ...startedGoals[goalId],
            goal: goals[startedGoals[goalId].goalId]
        }
    }), {})
);
export const getStartedGoalsEntitiesWithGoalSelector = createSelector(
    [getEntitiesStartedGoalsSelector, getStartedGoalsSelector],
    (goals, startedGoalsState) => ({
        ...startedGoalsState,
        goals
    })
);