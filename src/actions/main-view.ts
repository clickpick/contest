import { SyntheticEvent } from 'react';
import { ActionTypes } from '../types/store';
import { MainPanels } from '../types/panels';

import { enableSwipeBack, disableSwipeBack } from '../helpers/vk';

export const setPanel = (activePanel: MainPanels, history: Array<string>) => ({
    type: ActionTypes.SET_MAIN_VIEW_PANEL,
    activePanel,
    history
});

export const goForward = (e: SyntheticEvent<HTMLElement>) => (dispath: any, goState: any) => {
    const { mainView: { activePanel, history } } = goState();
    
    if (!(e.currentTarget instanceof HTMLElement)) {
        return;
    }

    const nextPanel = e.currentTarget.dataset.to as MainPanels;

    if (activePanel === MainPanels.HOME) {
        enableSwipeBack();
    }

    dispath(setPanel(nextPanel, [...history, nextPanel]));
};

export const goBack = () => (dispath: any, goState: any) => {
    const { mainView: { history } } = goState();

    if (history.length === 1) {
        disableSwipeBack();
    }

    const nextHistory = [...history].slice(0, history.length - 1);
    const nextPanel = nextHistory[nextHistory.length - 1];

    dispath(setPanel(nextPanel, nextHistory));
};