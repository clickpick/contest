import React, { FC } from 'react';

import { MainPanels } from '../types/panels';

import useMainView from '../hooks/use-main-view';

import { View } from '@vkontakte/vkui';

import Home from '../panels/Home';
import Profile from '../panels/Profile';

export interface MainProps {
    id: string
}

const Main: FC<MainProps> = ({ id }: MainProps) => {
    const mainView = useMainView();

    return (
        <View
            id={id}
            activePanel={mainView.activePanel}
            history={mainView.history}
            header={false}
            onSwipeBack={mainView.goBack}>
            <Home id={MainPanels.HOME} goForward={mainView.goForward} />
            <Profile id={MainPanels.PROFILE} goBack={mainView.goBack} />
        </View>
    );
};

export default Main;