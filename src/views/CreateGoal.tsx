import React, { FC } from 'react';

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

    console.log(createGoalView);


    return (
        <View
            id={id}
            activePanel={createGoalView.activePanel}
            history={createGoalView.history}
            header={false}
            onSwipeBack={createGoalView.goBack}>
            <CreateGoalStart id={CreateGoalPanels.START} goForward={createGoalView.goForward} />
            <CreateGoalFinish id={CreateGoalPanels.FINISH} goBack={createGoalView.goBack} />
        </View>
    );
};

export default CreateGoal;