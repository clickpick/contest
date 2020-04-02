import React, { FC, useState, useEffect, useCallback } from 'react';

import '../styles/style.css';

import useUser from '../hooks/use-user';
import useGoals from '../hooks/use-goals';
import useStartedGoals from '../hooks/use-started-goals';

import { ConfigProvider, Root } from '@vkontakte/vkui';
import Loader from '../views/Loader';
import Main from '../views/Main';
import CreateGoal from '../views/CreateGoal';

const App: FC = () => {
    const [activeView, setActiveView] = useState<string>('loader');

    const createGoal = useCallback(() => setActiveView('create-goal'), []);
    const goMain = useCallback(() => setActiveView('main'), []);

    const { data, auth } = useUser();
    const { goalIds, fetchGoals } = useGoals();
    const { goalIds: sGIds, fetchStartedGoals } = useStartedGoals();

    useEffect(() => {
        auth();
        fetchGoals();
        fetchStartedGoals();
    }, [auth, fetchGoals, fetchStartedGoals]);

    useEffect(() => {
        if (activeView === 'loader') {
            if (!!data && !!goalIds && !!sGIds) {
                setTimeout(() => setActiveView('main'), 500);
            }
        }
    }, [activeView, data, goalIds, sGIds]);

    return (
        <ConfigProvider isWebView={true}>
            <Root activeView={activeView}>
                <Main id="main" createGoal={createGoal} />
                <CreateGoal id="create-goal" goMain={goMain} />
                <Loader id="loader" />
            </Root>
        </ConfigProvider>
    );
};

export default App;