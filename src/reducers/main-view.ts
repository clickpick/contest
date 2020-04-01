import {
    ActionTypes,
    View,
    SetMainViewPanel, StartedGoalCreated
} from '../types/store';
import { AppState } from './index';
import { MainPanels } from '../types/panels';

type GoalsReducerActions = SetMainViewPanel<MainPanels> | StartedGoalCreated;

export type MainView = View<MainPanels>;

export const mainViewInitialState: MainView = {
    activePanel: MainPanels.HOME,
    history: [MainPanels.HOME]
};

export default function mainView(state = mainViewInitialState, action: GoalsReducerActions): MainView {
    if (action.type === ActionTypes.SET_MAIN_VIEW_PANEL) {
        return {
            ...state,
            activePanel: action.activePanel,
            history: action.history  
        };
    }

    if (action.type === ActionTypes.STARTED_GOALS_CREATED) {
        return {
            activePanel: MainPanels.PROFILE,
            history: [MainPanels.HOME, MainPanels.PROFILE]
        };
    }

    return state;
};

// Selectors
export const getMainViewSelector = (state: AppState) => state.mainView;