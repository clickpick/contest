import {
    ActionTypes,
    StartedGoalIds, StartedGoals, StartedGoalsState,
    StartedGoalsLoad, StartedGoalsSuccess, StartedGoalsFailure
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type StartedGoalsReducerActions = StartedGoalsLoad | StartedGoalsSuccess | StartedGoalsFailure;

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

        default:
            return state;
    }
}

function goals(state = initialGoals, action: StartedGoalsReducerActions): StartedGoals {
    switch (action.type) {
        case ActionTypes.STARTED_GOALS_SUCCESS:
            return action.payload.entities.startedGoals;
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