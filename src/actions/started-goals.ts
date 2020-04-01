import { CALL_API, Methods } from '../middleware/api';
import { ActionTypes } from '../types/store';
import { arrayOfStartedGoals } from '../schema';

export const fetchStartedGoals = () => ({
    [CALL_API]: {
        types: [ActionTypes.STARTED_GOALS_REQUEST, ActionTypes.STARTED_GOALS_SUCCESS, ActionTypes.STARTED_GOALS_FAILURE],
        endpoint: '/started-goals',
        method: Methods.GET,
        schema: arrayOfStartedGoals
    }
});
