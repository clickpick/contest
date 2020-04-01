import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StartedGoalsState } from '../types/store';
import { getStartedGoalsSelector } from '../reducers/started-goals';
import * as GoalsActions from '../actions/started-goals';

type FetchGoals = () => void;

export interface UseStartedGoals extends StartedGoalsState {
    fetchStartedGoals: FetchGoals
}

export default function useStartedGoals(): UseStartedGoals {
    const state = useSelector(getStartedGoalsSelector);
    const dispatch = useDispatch();

    const fetchStartedGoals = useCallback<FetchGoals>(() => dispatch(GoalsActions.fetchStartedGoals()), [dispatch]);

    return { ...state, fetchStartedGoals };
}