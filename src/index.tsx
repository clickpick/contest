import React from 'react';
import { render } from 'react-dom';

import { init, subscribe } from './helpers/vk';

import configureStore from './store/configureStore';
import Root from './containers/Root';

init();
subscribe();

const store = configureStore();

render(<Root store={store} />, document.getElementById('root'));