import { CALL_API, Methods } from '../middleware/api';
import { ActionTypes } from '../types/store';
import { arrayOfStartedGoals, startedGoal } from '../schema';

export const fetchStartedGoals = () => ({
    [CALL_API]: {
        types: [ActionTypes.STARTED_GOALS_REQUEST, ActionTypes.STARTED_GOALS_SUCCESS, ActionTypes.STARTED_GOALS_FAILURE],
        endpoint: '/started-goals',
        method: Methods.GET,
        schema: arrayOfStartedGoals
    }
});

export const createGoal = (goalId: number, comment: string) => ({
    [CALL_API]: {
        types: [ActionTypes.STARTED_GOALS_REQUEST, ActionTypes.STARTED_GOALS_CREATED, ActionTypes.STARTED_GOALS_FAILURE],
        endpoint: '/started-goals',
        method: Methods.POST,
        data: { goalId, comment },
        schema: startedGoal
    }
});

export const loadPhoto = (goalId: number, photo: any) => {
    const data = new FormData();
    data.append('photo', photo);

    return {
        [CALL_API]: {
            types: ['', ActionTypes.STARTED_GOALS_PHOTO_LOADED, ActionTypes.STARTED_GOALS_FAILURE],
            endpoint: `/started-goals/${goalId}/upload-photo`,
            method: Methods.POST,
            data,
            schema: {},
            propsWithSuccess: { goalId }
        }
    };
}