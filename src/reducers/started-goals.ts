import { createSelector } from 'reselect';
import { getGoalsEntitiesSelector, getSelectedGoalSelector } from './goals';
import {
    ActionTypes,
    StartedGoalIds, StartedGoals, StartedGoalsWithGoal, StartedGoalsState, Goals, StartedGoalsWithGoalState,
    StartedGoalsLoad, StartedGoalsSuccess, StartedGoalsFailure, StartedGoalCreated, StartedGoalsPhotoLoaded, StartedGoalLike
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type StartedGoalsReducerActions = StartedGoalsLoad | StartedGoalsSuccess | StartedGoalsFailure | StartedGoalCreated | StartedGoalsPhotoLoaded | StartedGoalLike;

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
            return (action.payload.entities.hasOwnProperty('startedGoals'))
                ? action.payload.entities.startedGoals
                : state;
        
        case ActionTypes.STARTED_GOALS_CREATED:
            return {
                ...state,
                ...action.payload.entities.startedGoals
            };
        case ActionTypes.STARTED_GOALS_PHOTO_LOADED:
            return {
                ...state,
                [action.propsWithSuccess.goalId]: {
                    ...state[action.propsWithSuccess.goalId],
                    needPhoto: false,
                    photo: action.payload.result
                }
            };

        case ActionTypes.STARTED_GOALS_LIKE:
            return {
                ...state,
                [action.goalId]: {
                    ...state[action.goalId],
                    isLiked: true
                }
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
export const getEntitiesStartedGoalsSelector = (state: AppState) => state.startedGoals.goals;
export const getG = (state: AppState) => state.startedGoals.goals;
export const getEntitiesStartedGoalsWithGoalSelector = createSelector<AppState, Goals, StartedGoals, StartedGoalsWithGoal>(
    [getGoalsEntitiesSelector, getG],
    (goals, startedGoals) => Object.keys(startedGoals).reduce((acc, goalId) => ({
        ...acc,
        [goalId]: {
            ...startedGoals[goalId],
            goal: goals[startedGoals[goalId].goalId]
        }
    }), {})
);
export const getStartedGoalsEntitiesWithGoalSelector = createSelector<AppState, StartedGoalsWithGoal, StartedGoalsState, StartedGoalsWithGoalState>(
    [getEntitiesStartedGoalsWithGoalSelector, getStartedGoalsSelector],
    (goals, startedGoalsState) => ({
        ...startedGoalsState,
        goals
    })
);

export const getGoalsWithFilterSelector = createSelector<AppState, any, StartedGoalsWithGoalState, StartedGoalsWithGoalState>(
    [getSelectedGoalSelector, getStartedGoalsEntitiesWithGoalSelector],
    (selectedGoal, state) => {
        switch (selectedGoal) {
            case 'all':
                return state;
            case 'friends':
                return {
                    ...state,
                    goalIds: state.goalIds && state.goalIds.filter((goalId) => state.goals[goalId].user.isFriend)
                };
            default:
                return {
                    ...state,
                    goalIds: state.goalIds && state.goalIds.filter((goalId) => state.goals[goalId].goal.id === selectedGoal)
                };
        }
    }
);