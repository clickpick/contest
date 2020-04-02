import React, { FC, useCallback, useMemo } from 'react';

import { PanelPrimary } from '../types/props';
import { CreateGoalPanels } from '../types/panels';

import useGoals from '../hooks/use-goals';

import { Panel, PanelHeaderSimple, PanelHeaderClose } from '@vkontakte/vkui';
import Group from '../components/Group';
import Emoji from '../components/Emoji';
import Title from '../components/Title';
import Footnote from '../components/Footnote';
import Cell from '../components/Cell';

export interface CreateGoalStartProps extends PanelPrimary {
    setGoal(e: any): void
    goMain(): void
}

const CreateGoalStart: FC<CreateGoalStartProps> = ({ id, goForward, setGoal, goMain }: CreateGoalStartProps) => {
    const { goalIds, goals } = useGoals();

    const goalView = useCallback((id) =>
        <Cell
            key={id}
            size="small"
            hCenter={true}
            before={<Emoji size="medium" children={goals[id].emoji} />}
            children={goals[id].title}
            data-goal-id={id}
            data-to={CreateGoalPanels.FINISH}
            onClick={setGoal} />,
        [goals, setGoal]);

    const bodyView = useMemo(() => (Array.isArray(goalIds)) &&
        <Group vertical className="padding-blue--top padding-blue--bottom">
            {goalIds.map(goalView)}
        </Group>,
        [goalIds, goalView]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderClose onClick={goMain} />} separator={false} />
            <Group vertical center className="margin-pink--top margin-pink--bottom">
                <Emoji className="margin-purple--bottom margin-purple--left" size="large" children="🎯" />
                <Title className="margin-aqua--bottom">Сфокусируйся</Title>
                <Footnote className="color-opacity--secondary Ta(c)">
                    Выбери пункт, которому ты хочешь<br />уделять больше времени
                </Footnote>
            </Group>

            {bodyView}
        </Panel>
    );
};

export default CreateGoalStart;