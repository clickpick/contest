import { combineReducers } from 'redux';

import user from './user';
import goals from './goals';

const rootReducer = combineReducers({
    user,
    goals
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

export { userInitialState } from './user';
export { goalsInitialState } from './goals';