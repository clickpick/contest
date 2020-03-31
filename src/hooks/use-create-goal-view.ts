import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CreateGoalView, getCreateGoalViewSelector } from '../reducers/create-goal-view';
import * as CreateGoalViewActions from '../actions/create-goal-view';

export interface UseCreateGoalView extends CreateGoalView {
    goBack: () => void,
    goForward: (e: any) => void
}

export default function useCreateGoalView(): UseCreateGoalView {
    const state = useSelector(getCreateGoalViewSelector);
    const dispatch = useDispatch();

    const goBack = useCallback(() => dispatch(CreateGoalViewActions.goBack()), [dispatch]);
    const goForward = useCallback((e: any) => dispatch(CreateGoalViewActions.goForward(e)), [dispatch]);

    return { ...state, goBack, goForward };
}