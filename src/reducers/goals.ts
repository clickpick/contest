import {
    ActionTypes,
    GoalIds, Goals, GoalsState,
    GoalsLoad, GoalsSuccess, GoalsFailure
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type GoalsReducerActions = GoalsLoad | GoalsSuccess | GoalsFailure;

const initialGoalIds: GoalIds = null;
const initialGoals: Goals = {};

export const goalsInitialState: GoalsState = {
    pending: initialPending,
    error: initialError,
    goalIds: initialGoalIds,
    goals: initialGoals
};

function goalIds(state = initialGoalIds, action: GoalsReducerActions): GoalIds {
    switch (action.type) {
        case ActionTypes.GOALS_SUCCESS:
            return state;
        default:
            return state;
    }
}

function goals(state = initialGoals, action: GoalsReducerActions): Goals {
    switch (action.type) {
        case ActionTypes.GOALS_SUCCESS:
            return state;
        default:
            return state;
    }
}

export default function userReducer(state = goalsInitialState, action: GoalsReducerActions): GoalsState {
    return {
        pending: isPending<GoalsReducerActions>(state.pending, action, [ActionTypes.GOALS_REQUEST, ActionTypes.GOALS_SUCCESS, ActionTypes.GOALS_FAILURE]),
        error: isError<GoalsReducerActions>(state.error, action, ActionTypes.GOALS_FAILURE),
        goalIds: goalIds(state.goalIds, action),
        goals: goals(state.goals, action)
    };
}

// Selectors
export const getGoalsSelector = (state: AppState) => state.goals;