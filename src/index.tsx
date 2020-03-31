import React from 'react';
import { render } from 'react-dom';

import { init, setViewSettings } from './helpers/vk';

import configureStore from './store/configureStore';
import Root from './containers/Root';

init();
setViewSettings('dark');

const store = configureStore();

render(<Root store={store} />, document.getElementById('root'));