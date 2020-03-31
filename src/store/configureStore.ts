import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer, { initialStore } from '../reducers';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export default (preloadedState = initialStore) => createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, api))
);