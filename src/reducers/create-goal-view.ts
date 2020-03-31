import {
    ActionTypes,
    View,
    SetCreateGoalPanel
} from '../types/store';
import { AppState } from './index';
import { CreateGoalPanels } from '../types/panels';

type CreateGoalViewReducerActions = SetCreateGoalPanel<CreateGoalPanels>;

export type CreateGoalView = View<CreateGoalPanels>;

export const createGoalViewInitialState: CreateGoalView = {
    activePanel: CreateGoalPanels.START,
    history: [CreateGoalPanels.START]
};

export default function createGoalView(state = createGoalViewInitialState, action: CreateGoalViewReducerActions): CreateGoalView {
    if (action.type === ActionTypes.SET_CREATE_GOAL_PANEL) {
        return {
            ...state,
            activePanel: action.activePanel,
            history: action.history
        };
    }

    return state;
};

// Selectors
export const getCreateGoalViewSelector = (state: AppState) => state.createGoalView;