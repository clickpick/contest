import React, { FC } from 'react';

import { PanelSecondary } from '../types/props';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';

const CreateGoalFinish: FC<PanelSecondary> = ({ id, goBack }: PanelSecondary) => {
    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            finish
        </Panel>
    );
};

export default CreateGoalFinish;