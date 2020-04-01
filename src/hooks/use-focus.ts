import { FocusEventHandler, useState, useCallback } from 'react';

export interface Handlers<T> {
    onFocus: FocusEventHandler<T>,
    onBlur: FocusEventHandler<T>
}

export default function useFocus<T>(initialFocus = false): [boolean, Handlers<T>] {
    const [focus, setFocus] = useState<boolean>(initialFocus || false);

    const onFocus = useCallback<FocusEventHandler<T>>(() => setFocus(true), []);
    const onBlur = useCallback<FocusEventHandler<T>>(() => setFocus(false), []);

    return [focus, { onFocus, onBlur }];
}