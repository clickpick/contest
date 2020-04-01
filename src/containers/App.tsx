import React, { FC, useState, useEffect, useCallback } from 'react';

import '../styles/style.css';

import useUser from '../hooks/use-user';
import useGoals from '../hooks/use-goals';
import useStartedGoals from '../hooks/use-started-goals';

import { ConfigProvider, Root } from '@vkontakte/vkui';
import Main from '../views/Main';
import CreateGoal from '../views/CreateGoal';

const App: FC = () => {
    const [activeView, setActiveView] = useState<string>('main');

    const createGoal = useCallback(() => setActiveView('create-goal'), []);
    const goMain = useCallback(() => setActiveView('main'), []);

    const { auth } = useUser();
    const { fetchGoals } = useGoals();
    const { fetchStartedGoals } = useStartedGoals();

    useEffect(() => {
        auth();
        fetchGoals();
        fetchStartedGoals();
    }, [auth, fetchGoals, fetchStartedGoals]);

    return (
        <ConfigProvider isWebView={true}>
            <Root activeView={activeView}>
                <Main id="main" createGoal={createGoal} />
                <CreateGoal id="create-goal" goMain={goMain} />
            </Root>
        </ConfigProvider>
    );
};

export default App;