import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GoalsState } from '../types/store';
import { getGoalsSelector } from '../reducers/goals';
import * as GoalsActions from '../actions/goals';

type FetchGoals = () => void;
type SetGoal = (e: any) => void;

export interface UseGoals extends GoalsState {
    fetchGoals: FetchGoals,
    setGoal: SetGoal
}

export default function useUser(): UseGoals {
    const user = useSelector(getGoalsSelector);
    const dispatch = useDispatch();

    const fetchGoals = useCallback<FetchGoals>(() => dispatch(GoalsActions.fetchGoals()), [dispatch]);
    const setGoal = useCallback<SetGoal>((e) =>
        dispatch(GoalsActions.setGoal(e.currentTarget.dataset.goalId)), [dispatch]);

    return { ...user, fetchGoals, setGoal };
}