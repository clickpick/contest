import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StartedGoalsState } from '../types/store';
import { getStartedGoalsEntitiesWithGoalSelector } from '../reducers/started-goals';
import * as GoalsActions from '../actions/started-goals';

type FetchGoals = () => void;
type CreateGoal = (goalId: number, comment: string) => void;

export interface UseStartedGoals extends StartedGoalsState {
    fetchStartedGoals: FetchGoals,
    createGoal: CreateGoal
}

export default function useStartedGoals(): UseStartedGoals {
    const state = useSelector(getStartedGoalsEntitiesWithGoalSelector);
    const dispatch = useDispatch();

    const fetchStartedGoals = useCallback<FetchGoals>(() => dispatch(GoalsActions.fetchStartedGoals()), [dispatch]);

    const createGoal = useCallback<CreateGoal>((goalId, comment) =>
        dispatch(GoalsActions.createGoal(goalId, comment)), [dispatch]);

    return { ...state, fetchStartedGoals, createGoal };
}