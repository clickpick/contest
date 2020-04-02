import React, { FC, useRef, useMemo, useCallback, useEffect } from 'react';

import { PanelSecondary } from '../types/props';

import { getHashParam } from '../helpers/location';
import { getStoryLink } from '../middleware/api';
import { showStoryBox } from '../helpers/vk';

import useUser from '../hooks/use-user';
import useStartedGoals from '../hooks/use-started-goals';

import { Panel, PanelHeaderSimple, PanelHeaderBack, Avatar } from '@vkontakte/vkui';
import Cell from '../components/Cell';
import Group from '../components/Group';
import Emoji from '../components/Emoji';
import Card from '../components/Card';
import Footnote from '../components/Footnote';
import Photo from '../components/Photo';
import PhotoLoad from '../components/PhotoLoad';
import CircleButton from '../components/CircleButton';
import Statistics from '../components/Statistics';

import { ReactComponent as IconUnion } from '../svg/union.svg';
import { ReactComponent as IconSettings } from '../svg/settings.svg';
import { ReactComponent as IconHeart } from '../svg/heart.svg';
import { ReactComponent as IconVk } from '../svg/vk.svg';

const Profile: FC<PanelSecondary> = ({ id, goBack }: PanelSecondary) => {
    const { data } = useUser();
    const { goals, loadPhoto, like } = useStartedGoals();

    const goalId = useRef<string | null>(getHashParam(window.location.href, 'goal'));
    const isMe = useRef(goalId.current === null || Number(goalId.current) === data?.startedGoalId);

    const postStory = useCallback(async (e: any) => {
        const goalId: number = Number(e.currentTarget.dataset.goalId);

        if (!!goalId) {
            e.currentTarget.disabled = true;
            const link = await getStoryLink(goalId);

            if (link !== null) {
                showStoryBox(link);
            }

            e.currentTarget.disabled = false;
        }
    }, []);

    useEffect(() => {
        window.history.pushState('', '', '#');
    }, []);

    const bodyView = useMemo(() => {
        if (!data || data.startedGoal === false) {
            // todo message
            return;
        }

        let startedGoal = (goalId.current === null) ? data?.startedGoal : goals[goalId.current];
        const { goal, user, photo } = startedGoal;

        const profileHintView = <>
            <Emoji size="xsmall" children={goal.emoji} />
            {goal.title}
        </>;

        const actionsView = (isMe.current)
            ? <Group start jcCenter className="margin-pink--bottom">
                {(startedGoal.needPhoto) &&
                    <PhotoLoad
                        className="margin-purple--right"
                        goalId={startedGoal.id}
                        onChange={loadPhoto} />}
                <CircleButton
                    className="margin-purple--right"
                    icon={<IconUnion />}
                    data-goal-id={startedGoal.id}
                    onClick={postStory}>
                    Поделиться<br />прогрессом
                </CircleButton>
                <CircleButton
                    icon={<IconSettings />}
                    disabled>
                    Настроить<br />цели (soon)
                </CircleButton>
            </Group>
            : <Group start jcCenter className="margin-pink--bottom">
                <CircleButton
                    className="margin-purple--right"
                    priority="danger"
                    aria-pressed={startedGoal.isLiked}
                    icon={<IconHeart />}
                    data-goal-id={startedGoal.id}
                    onClick={like}>
                    {(startedGoal.isLiked) ? 'Спасибо!' : <>Мотивировать<br />лайком!</>}
                </CircleButton>
                <CircleButton
                    priority="primary"
                    href={`https://vk.com/id${user.id}`}
                    icon={<IconVk />}>
                    Перейти<br />на страницу
                </CircleButton>
            </Group>

        return (
            <>
                <Cell
                    className="margin-aqua--bottom"
                    size="medium"
                    before={<Avatar size={36} src={user.avatar200} />}
                    hint={profileHintView}>
                    {user.firstName} {user.lastName}
                </Cell>
                <Group vertical center className="padding-blue--rl">
                    <Card className="margin-purple--bottom padding-green--tb padding-blue--rl" priority="secondary">
                        <Footnote className="color-opacity--secondary Ta(c)">«{startedGoal.comment}»</Footnote>
                    </Card>
                    <Photo className="margin-pink--bottom" photo={photo && photo.link} />
                    {actionsView}
                    <Statistics className="margin-pink--bottom" {...startedGoal} daysCount={user.daysCount} />
                </Group>
            </>
        );
    }, [data, goals, loadPhoto, postStory, like]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            {bodyView}
        </Panel>
    );
};

export default Profile;