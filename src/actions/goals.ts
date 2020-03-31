import { CALL_API, Methods } from '../middleware/api';
import { ActionTypes } from '../types/store';
import { arrayOfGoals } from '../schema';

export const fetchGoals = () => ({
    [CALL_API]: {
        types: [ActionTypes.GOALS_REQUEST, ActionTypes.GOALS_SUCCESS, ActionTypes.GOALS_FAILURE],
        endpoint: '/goals',
        method: Methods.GET,
        schema: arrayOfGoals
    }
});
