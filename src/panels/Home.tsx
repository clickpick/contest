import React, { FC } from 'react';

import { PanelPrimary } from '../types/props';

import { Panel, PanelHeaderSimple } from '@vkontakte/vkui';

const Home: FC<PanelPrimary> = ({ id }: PanelPrimary) => {

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple children="Home" separator={false} />
            Home
        </Panel>
    );
};

export default Home;