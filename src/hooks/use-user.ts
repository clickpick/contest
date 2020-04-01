import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UserWithGoalState } from '../types/store';
import { getUserWithStartedGoalSelected } from '../reducers/user';
import * as UserActions from '../actions/user';

type Auth = () => void;

export interface UseUser extends UserWithGoalState {
    auth: Auth
}

export default function useUser(): UseUser {
    const user = useSelector(getUserWithStartedGoalSelected);
    const dispatch = useDispatch();

    const auth = useCallback<Auth>(() => dispatch(UserActions.auth()), [dispatch]);

    return { ...user, auth };
}