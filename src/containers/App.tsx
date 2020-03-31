import React, { FC, useEffect } from 'react';

import '../styles/style.css';

import useUser from '../hooks/use-user';
import useGoals from '../hooks/use-goals';

import { ConfigProvider, Root } from '@vkontakte/vkui';
import Main from '../views/Main';

const App: FC = () => {
    const { auth } = useUser();
    const { fetchGoals } = useGoals();

    useEffect(() => {
        auth();
        fetchGoals();
    }, [auth, fetchGoals]);

    return (
        <ConfigProvider isWebView={true}>
            <Root activeView="main">
                <Main id="main" />
            </Root>
        </ConfigProvider>
    );
};

export default App;