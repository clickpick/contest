import React, { FC, useEffect } from 'react';

import '../styles/style.css';

import useUser from '../hooks/use-user';

import { ConfigProvider, Root } from '@vkontakte/vkui';
import Main from '../views/Main';

const App: FC = () => {
    const { auth } = useUser();

    useEffect(() => {
        auth();
    }, [auth]);

    return (
        <ConfigProvider isWebView={true}>
            <Root activeView="main">
                <Main id="main" />
            </Root>
        </ConfigProvider>
    );
};

export default App;