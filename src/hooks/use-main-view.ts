import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MainView, getMainViewSelector } from '../reducers/main-view';
import * as MainViewActions from '../actions/main-view';

export interface UseMainView extends MainView {
    goBack: () => void,
    goForward: (e: any) => void
}

export default function useMainView(): UseMainView {
    const state = useSelector(getMainViewSelector);
    const dispatch = useDispatch();

    const goBack = useCallback(() => dispatch(MainViewActions.goBack()), [dispatch]);
    const goForward = useCallback((e: any) => dispatch(MainViewActions.goForward(e)), [dispatch]);

    return { ...state, goBack, goForward };
}