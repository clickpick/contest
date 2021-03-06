import React, { FC, useState, useMemo, useCallback } from 'react';

import { PanelSecondary } from '../types/props';

import useGoals from '../hooks/use-goals';
import useChange from '../hooks/use-change';
import useStartedGoals from '../hooks/use-started-goals';

import { Panel, PanelHeaderSimple, PanelHeaderBack, FixedLayout } from '@vkontakte/vkui';
import Group from '../components/Group';
import Emoji from '../components/Emoji';
import Title from '../components/Title';
import Footnote from '../components/Footnote';
import TextField from '../components/TextField';
import Button from '../components/Button';

export interface CreateGoalFinishProps extends PanelSecondary {
    goalId: number | null,
    startGoal(comment: string): void
}

const CreateGoalFinish: FC<CreateGoalFinishProps> = ({ id, goalId, goBack, startGoal }: CreateGoalFinishProps) => {
    const { goals } = useGoals();
    const [commentError, setCommentError] = useState<string | undefined>(undefined);
    const resetCommentError = useCallback(() => setCommentError(undefined), []);
    const comment = useChange(undefined, resetCommentError);

    const { pending: disabled } = useStartedGoals();

    const handleSubmit = useCallback(() => {
        const value = comment.value.trim();

        if (value.length === 0) {
            setCommentError('Введите комментарий');
            return;
        }

        startGoal(value);
    }, [comment.value, startGoal]);

    const bodyView = useMemo(() => (!!goalId) &&
        <>
            <Group vertical center className="margin-pink--top margin-pink--bottom">
                <Emoji
                    className="margin-purple--bottom"
                    size="large"
                    children={goals[goalId].emoji} />
                <Title className="margin-aqua--bottom">{goals[goalId].title}</Title>
                <Footnote className="color-opacity--secondary Ta(c)">
                    Напиши кратко, почему ты хочешь<br />
                    сфокусироваться на этом? <span className="color-opacity--secondary">(это будут<br />
                    видеть другие пользователи)</span>
                </Footnote>
            </Group>
            <TextField
                view="promo"
                placeholder="Краткое описание"
                {...comment}
                error={!!commentError}
                hint={commentError} />
            <FixedLayout vertical="bottom">
                <Group jcCenter className="margin-pink--bottom">
                    <Button
                        children="Поставить себе эту цель"
                        disabled={!comment.value.trim() || disabled}
                        onClick={handleSubmit} />
                </Group>
            </FixedLayout>
        </>, [goalId, goals, comment, commentError, disabled, handleSubmit]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            {bodyView}
        </Panel>
    );
};

export default CreateGoalFinish;