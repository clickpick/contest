import React, { FC, useCallback, useMemo } from 'react';
import cn from 'classnames';

import { PanelPrimary } from '../types/props';
import { MainPanels } from '../types/panels';

import useUser from '../hooks/use-user';
import useGoals from '../hooks/use-goals';
import useStartedGoals from '../hooks/use-started-goals';

import { Panel, PanelHeaderSimple, Avatar, HorizontalScroll, FixedLayout } from '@vkontakte/vkui';
import Group from '../components/Group';
import Chart from '../components/Chart';
import Button from '../components/Button';
import PhotoLoad from '../components/PhotoLoad';

export interface HomeProps extends PanelPrimary {
    createGoal(): void
}

const Home: FC<HomeProps> = ({ id, goForward, createGoal }: HomeProps) => {
    const { pending, data } = useUser();
    const { goalIds, goals, selectedGoal, setGoal } = useGoals();
    const { goalIds: sGIds, goals: sGs, loadPhoto } = useStartedGoals(true);

    const myGoal = useMemo(() => !!data && data.startedGoal && data.startedGoal.goal, [data]);

    const openProfile = useCallback((e: any) => {
        const goalId = e.currentTarget.dataset.goalId;

        if (Boolean(goalId)) {
            window.location.search = window.location.search + '#goal=' + goalId;
        }

        goForward(e);
    }, [goForward]);

    const avatarView = useMemo(() => (!pending && data) &&
        <Avatar
            className="margin-purple--left"
            size={32}
            src={data.avatar200}
            data-to={MainPanels.PROFILE}
            data-goal-id={data.startedGoalId}
            onClick={openProfile} />,
        [pending, data, openProfile]);

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
                aria-pressed={selectedGoal === id}
                data-goal-id={id}
                onClick={setGoal} />
        </div>,
        [goals, selectedGoal, setGoal]);

    const goalsView = useMemo(() => (Array.isArray(goalIds)) &&
        <HorizontalScroll className="margin-pink--top margin-pink--bottom">
            <Group start shrink>
                <div className="padding-yellow--right padding-blue--left">
                    <Button
                        priority="secondary"
                        size="small"
                        children="Все люди"
                        aria-pressed={selectedGoal === 'all'}
                        data-goal-id="all"
                        onClick={setGoal} />
                </div>
                <div className="padding-yellow--right">
                    <Button
                        priority="secondary"
                        size="small"
                        children="Друзья"
                        aria-pressed={selectedGoal === 'friends'}
                        data-goal-id="friends"
                        onClick={setGoal} />
                </div>
                {(myGoal) ? goalView(myGoal.id, 0, [1]) : goalIds.map(goalView)}
            </Group>
        </HorizontalScroll>,
        [goalIds, selectedGoal, myGoal, goalView, setGoal]);

    const sGView = useMemo(() => (Array.isArray(sGIds)) &&
        <HorizontalScroll className="padding-black--bottom">
            <Chart
                goalIds={sGIds}
                goals={sGs}
                maxHeight={328}
                profileLink={MainPanels.PROFILE}
                goProfile={openProfile} />
        </HorizontalScroll>,
        [sGIds, sGs, openProfile]);

    const createGoalView = useMemo(() => (!!data) && (data?.startedGoalId === false) &&
        <FixedLayout vertical="bottom">
            <Group jcCenter className="margin-pink--bottom">
                <Button children="Поставить себе цель" onClick={createGoal} />
            </Group>
        </FixedLayout>,
        [data, createGoal]);

    const userActionView = useMemo(() => (!!data && data.startedGoal && data.startedGoal.needPhoto) &&
        <FixedLayout vertical="bottom">
            <Group jcCenter className="margin-pink--bottom">
                <PhotoLoad
                    shape="range"
                    goalId={data?.startedGoal.id}
                    onChange={loadPhoto} />
            </Group>
        </FixedLayout>,
        [data, loadPhoto]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={avatarView} separator={false} />
            {goalsView}
            {sGView}
            {createGoalView}
            {userActionView}
        </Panel>
    );
};

export default Home;