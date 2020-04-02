import {
    ActionTypes,
    GoalIds, Goals, SelectedGoal, GoalsState,
    GoalsLoad, GoalsSuccess, GoalsFailure, SetGoal
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type GoalsReducerActions = GoalsLoad | GoalsSuccess | GoalsFailure | SetGoal;

const initialGoalIds: GoalIds = null;
const initialGoals: Goals = {};
const initialSelectedGoal: SelectedGoal = 'all';

export const goalsInitialState: GoalsState = {
    pending: initialPending,
    error: initialError,
    goalIds: initialGoalIds,
    goals: initialGoals,
    selectedGoal: initialSelectedGoal
};

function goalIds(state = initialGoalIds, action: GoalsReducerActions): GoalIds {
    switch (action.type) {
        case ActionTypes.GOALS_SUCCESS:
            return action.payload.result;
        default:
            return state;
    }
}

function goals(state = initialGoals, action: GoalsReducerActions): Goals {
    switch (action.type) {
        case ActionTypes.GOALS_SUCCESS:
            return action.payload.entities.goals;
        default:
            return state;
    }
}

function selectedGoal(state = initialSelectedGoal, action: GoalsReducerActions): SelectedGoal {    
    if (action.type === ActionTypes.SET_GOAL) {
        const goal = Number(action.goal);
        

        if (isNaN(goal)) {
            return action.goal;
        }

        return goal;
    }

    return state;
}

export default function userReducer(state = goalsInitialState, action: GoalsReducerActions): GoalsState {
    return {
        pending: isPending<GoalsReducerActions>(state.pending, action, [ActionTypes.GOALS_REQUEST, ActionTypes.GOALS_SUCCESS, ActionTypes.GOALS_FAILURE]),
        error: isError<GoalsReducerActions>(state.error, action, ActionTypes.GOALS_FAILURE),
        goalIds: goalIds(state.goalIds, action),
        goals: goals(state.goals, action),
        selectedGoal: selectedGoal(state.selectedGoal, action)
    };
}

// Selectors
export const getGoalsSelector = (state: AppState) => state.goals;
export const getGoalsEntitiesSelector = (state: AppState) => state.goals.goals;
export const getSelectedGoalSelector = (state: AppState) => state.goals.selectedGoal;