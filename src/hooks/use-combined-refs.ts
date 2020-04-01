import { MutableRefObject, useRef, useEffect } from 'react';

export default function useCombinedRefs<T>(...refs: any[]): MutableRefObject<T | undefined | null> {
    const targetRef: MutableRefObject<T | undefined | null> = useRef<T>();

    useEffect(() => {
        refs.forEach(ref => {
            if (!ref) {
                return;
            }

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
}