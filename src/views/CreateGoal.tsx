import React, { FC, useState, useCallback } from 'react';

import { CreateGoalPanels } from '../types/panels';

import useCreateGoalView from '../hooks/use-create-goal-view';

import { View } from '@vkontakte/vkui';

import CreateGoalStart from '../panels/CreateGoalStart';
import CreateGoalFinish from '../panels/CreateGoalFinish';

export interface CreateGoalProps {
    id: string,
    goMain(): void
}

const CreateGoal: FC<CreateGoalProps> = ({ id }: CreateGoalProps) => {
    const createGoalView = useCreateGoalView();

    const [selectedGoalId, setGoalId] = useState<number | null>(null);

    const setGoal = useCallback((e: any) => {
        const goalId = Number(e.target.dataset.goalId);

        if (!goalId) {
            return;
        }

        setGoalId(goalId);
        createGoalView.goForward(e);
        console.log(e.target.dataset);

    }, [createGoalView]);

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
                setGoal={setGoal} />
            <CreateGoalFinish
                id={CreateGoalPanels.FINISH}
                goalId={selectedGoalId}
                goBack={createGoalView.goBack} />
        </View>
    );
};

export default CreateGoal;