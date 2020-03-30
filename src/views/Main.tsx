import React, { FC } from 'react';

import { MainPanels } from '../types/panels';

import usePanels from '../hooks/use-panels';

import { View } from '@vkontakte/vkui';

import Home from '../panels/Home';

export interface MainProps {
    id: string
}

const Main: FC<MainProps> = ({ id }: MainProps) => {
    const [activePanel, history, goForward, goBack] = usePanels(MainPanels.HOME);

    return (
        <View
            id={id}
            activePanel={activePanel}
            history={history}
            header={false}
            onSwipeBack={goBack}>
            <Home id={MainPanels.HOME} goForward={goForward} />
        </View>
    );
};

export default Main;