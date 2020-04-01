import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StartedGoalsWithGoalState } from '../types/store';
import { getStartedGoalsEntitiesWithGoalSelector } from '../reducers/started-goals';
import * as GoalsActions from '../actions/started-goals';

type FetchGoals = () => void;
type CreateGoal = (goalId: number, comment: string) => void;
type LoadPhoto = (goalId: number, file: any) => void;

export interface UseStartedGoals extends StartedGoalsWithGoalState {
    fetchStartedGoals: FetchGoals,
    createGoal: CreateGoal,
    loadPhoto: LoadPhoto
}

export default function useStartedGoals(): UseStartedGoals {
    const state = useSelector(getStartedGoalsEntitiesWithGoalSelector);
    const dispatch = useDispatch();

    const fetchStartedGoals = useCallback<FetchGoals>(() => dispatch(GoalsActions.fetchStartedGoals()), [dispatch]);

    const createGoal = useCallback<CreateGoal>((goalId, comment) =>
        dispatch(GoalsActions.createGoal(goalId, comment)), [dispatch]);

    const loadPhoto = useCallback<LoadPhoto>((goalid, file) =>
        dispatch(GoalsActions.loadPhoto(goalid, file)), [dispatch]);

    return { ...state, fetchStartedGoals, createGoal, loadPhoto };
}