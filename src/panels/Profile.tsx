import React, { FC, useMemo } from 'react';

import { PanelSecondary } from '../types/props';

import useUser from '../hooks/use-user';

import { Panel, PanelHeaderSimple, PanelHeaderBack, Avatar } from '@vkontakte/vkui';
import Cell from '../components/Cell';
import Group from '../components/Group';
import Emoji from '../components/Emoji';
import Card from '../components/Card';
import Footnote from '../components/Footnote';
import Photo from '../components/Photo';
import Statistics from '../components/Statistics';

const Profile: FC<PanelSecondary> = ({ id, goBack }: PanelSecondary) => {
    const { data } = useUser();

    const bodyView = useMemo(() => {
        if (!data || data.startedGoal === false) {
            return;
        }

        const { startedGoal } = data;

        const profileHintView = <>
            <Emoji size="xsmall" children={startedGoal.goal.emoji} />
            {startedGoal.goal.title}
        </>;

        return (
            <>
                <Cell
                    className="margin-aqua--bottom"
                    size="medium"
                    before={<Avatar size={36} src={data?.avatar200} />}
                    hint={profileHintView}>
                    {data?.firstName} {data?.lastName}
                </Cell>
                <Group vertical center className="padding-blue--rl">
                    <Card className="margin-purple--bottom padding-green--tb padding-blue--rl" priority="secondary">
                        <Footnote className="color-opacity--secondary Ta(c)">«{startedGoal.comment}»</Footnote>
                    </Card>
                    <Photo className="margin-pink--bottom" photo={startedGoal.photo && startedGoal.photo.link} />
                    <Statistics {...startedGoal} />
                </Group>
            </>
        );
    }, [data]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            {bodyView}
        </Panel>
    );
};

export default Profile;