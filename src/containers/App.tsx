import React, { FC } from 'react';

import '../styles/style.css';

import { ConfigProvider, Root } from '@vkontakte/vkui';
import Main from '../views/Main';

const App: FC = () => {
    return (
        <ConfigProvider isWebView={true}>
            <Root activeView="main">
                <Main id="main" />
            </Root>
        </ConfigProvider>
    );
};

export default App;