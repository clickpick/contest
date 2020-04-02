import React, { FC, useState, useCallback, useEffect } from 'react';

import { CreateGoalPanels } from '../types/panels';

import useCreateGoalView from '../hooks/use-create-goal-view';
import useStartedGoals from '../hooks/use-started-goals';
import useUser from '../hooks/use-user';

import { View } from '@vkontakte/vkui';

import CreateGoalStart from '../panels/CreateGoalStart';
import CreateGoalFinish from '../panels/CreateGoalFinish';

export interface CreateGoalProps {
    id: string,
    goMain(): void
}

const CreateGoal: FC<CreateGoalProps> = ({ id, goMain }: CreateGoalProps) => {
    const createGoalView = useCreateGoalView();
    const { createGoal } = useStartedGoals();
    const { data: user } = useUser();

    const [selectedGoalId, setGoalId] = useState<number | null>(null);

    const setGoal = useCallback((e: any) => {
        const goalId = Number(e.target.dataset.goalId);

        if (!goalId) {
            return;
        }

        setGoalId(goalId);
        createGoalView.goForward(e);
    }, [createGoalView]);

    const startGoal = useCallback((comment: string) => {
        if (!selectedGoalId) {
            return;
        }

        createGoal(selectedGoalId, comment);
    }, [selectedGoalId, createGoal]);

    useEffect(() => {
        if (user?.startedGoalId !== false) {
            goMain();
        }
    }, [user, goMain]);

    return (
        <View
            id={id}
            activePanel={createGoalView.activePanel}
            history={createGoalView.history}
            header={false}
            onSwipeBack={createGoalView.goBack}>
            <CreateGoalStart
                id={CreateGoalPanels.START}
                goForward={createGoalView.goForward}
                setGoal={setGoal}
                goMain={goMain} />
            <CreateGoalFinish
                id={CreateGoalPanels.FINISH}
                goalId={selectedGoalId}
                goBack={createGoalView.goBack}
                startGoal={startGoal} />
        </View>
    );
};

export default CreateGoal;