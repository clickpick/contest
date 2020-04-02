import React, { FC } from 'react';

import { MainPanels } from '../types/panels';

import useMainView from '../hooks/use-main-view';

import { View } from '@vkontakte/vkui';

import Home from '../panels/Home';
import Profile from '../panels/Profile';

export interface MainProps {
    id: string,
    createGoal(): void
}

const Main: FC<MainProps> = ({ id, createGoal }: MainProps) => {
    const mainView = useMainView();

    return (
        <View
            id={id}
            activePanel={mainView.activePanel}
            history={mainView.history}
            header={false}
            onSwipeBack={mainView.goBack}>
            <Home id={MainPanels.HOME} goForward={mainView.goForward} createGoal={createGoal} />
            <Profile id={MainPanels.PROFILE} goBack={mainView.goBack} createGoal={createGoal} />
        </View>
    );
};

export default Main;