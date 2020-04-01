import {
    ChangeEventHandler,
    useState, useRef, useMemo, useCallback
} from 'react';

export interface UseChange<T> {
    value: string,
    onChange: ChangeEventHandler<T>
};

export default function useChange<T>(defaultValue?: string, handleChange?: ChangeEventHandler<T>): UseChange<T> {
    const [stateValue, setStateValue] = useState<string>('');
    const isControlledOutside = useRef<boolean>(defaultValue === undefined);
    const value = useMemo<string>(() => (defaultValue !== undefined) ? defaultValue : stateValue, [defaultValue, stateValue]);

    const onChange = useCallback((e) => {
        if (isControlledOutside.current) {
            setStateValue(e.target.value);
        }

        if (handleChange) {
            handleChange(e);
        }
    }, [isControlledOutside, handleChange]);

    return { value, onChange };
}