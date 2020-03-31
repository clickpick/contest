import React, { FC } from 'react';

import { PanelSecondary } from '../types/props';

import useUser from '../hooks/use-user';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';

const Home: FC<PanelSecondary> = ({ id, goBack }: PanelSecondary) => {
    const { pending, data } = useUser();

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            profile
        </Panel>
    );
};

export default Home;