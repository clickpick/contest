import React, { FC } from 'react';
import { Provider } from 'react-redux';

import App from './App';

export interface RootProps {
    store: any
}

const Root: FC<RootProps> = ({ store }: RootProps) => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Root;