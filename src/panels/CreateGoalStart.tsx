import React, { FC } from 'react';

import { PanelPrimary } from '../types/props';
import { CreateGoalPanels } from '../types/panels';

import { Panel, PanelHeaderSimple } from '@vkontakte/vkui';

const CreateGoalStart: FC<PanelPrimary> = ({ id, goForward }: PanelPrimary) => {
    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple separator={false} />
            start
            <button onClick={goForward} data-to={CreateGoalPanels.FINISH}>finish</button>
        </Panel>
    );
};

export default CreateGoalStart;