import React, { FC, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import { PanelPrimary } from '../types/props';
import { MainPanels } from '../types/panels';

import useUser from '../hooks/use-user';
import useGoals from '../hooks/use-goals';

import { Panel, PanelHeaderSimple, Avatar, HorizontalScroll } from '@vkontakte/vkui';
import Group from '../components/Group';
import Button from '../components/Button';

const Home: FC<PanelPrimary> = ({ id, goForward }: PanelPrimary) => {
    const { pending, data } = useUser();
    const { goalIds, goals } = useGoals();

    const avatarView = useMemo(() => (!pending && data) &&
        <Avatar
            className="margin-purple--left"
            size={32}
            src={data.avatar200}
            data-to={MainPanels.PROFILE}
            onClick={goForward} />,
        [pending, data, goForward]);

    const [selectedGoalId, setGoalId] = useState<number | null>(null);

    const setGoal = useCallback((e: any) => {
        const catId = Number(e.target.dataset.catId);

        if (isNaN(catId)) {
            return;
        }

        setGoalId(catId);
    }, []);

    const resetGoal = useCallback(() => setGoalId(null), []);

    const goalView = useCallback((id: number, index: number, array: any[]) =>
        <div
            key={id}
            className={cn({
                'padding-yellow--right': true,
                'padding-blue--right': index === array.length - 1
            })}>
            <Button
                priority="secondary"
                size="small"
                children={goals[id].title}
                aria-pressed={selectedGoalId === id}
                data-cat-id={id}
                onClick={setGoal} />
        </div>,
        [goals, selectedGoalId, setGoal]);

    const goalsView = useMemo(() => (Array.isArray(goalIds)) &&
        <HorizontalScroll className="margin-pink--top margin-pink--bottom">
            <Group start shrink>
                <div className="padding-yellow--right padding-blue--left">
                    <Button
                        priority="secondary"
                        size="small"
                        children="Все люди"
                        aria-pressed={selectedGoalId === null}
                        onClick={resetGoal} />
                </div>
                {goalIds.map(goalView)}
            </Group>
        </HorizontalScroll>,
        [goalIds, selectedGoalId, goalView, resetGoal]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={avatarView} separator={false} />
            {goalsView}
        </Panel>
    );
};

export default Home;