import React, {
    ForwardRefRenderFunction, HTMLAttributes,
    useRef, useCallback, useLayoutEffect,
    memo, forwardRef
} from 'react';
import cn from 'classnames';

import useCombinedRefs from '../../hooks/use-combined-refs';

export interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
    value?: string,
    maxLength?: number
}

export function changeHeight(element: any, defaultHeight = 20): void {
    if (element) {
        const target = (element.target) ? element.target : element;
        target.style.height = `${defaultHeight}px`;
        target.style.height = `${target.scrollHeight}px`;
    }
}

const Textarea: ForwardRefRenderFunction<unknown, TextareaProps> = ({ className, value, onChange, ...restProps }: TextareaProps, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef: any = useCombinedRefs<HTMLTextAreaElement>(ref, textareaRef);

    const handleChange = useCallback((e) => {
        if (onChange) {
            onChange(e);
        }

        changeHeight(e);
    }, [onChange]);

    useLayoutEffect(() => {
        if (combinedRef.current) {
            changeHeight(combinedRef.current);
        }
    }, [combinedRef]);

    return (
        <textarea
            className={cn(className, 'Textarea', 'body')}
            defaultValue={value}
            onChange={handleChange}
            {...restProps}
            ref={combinedRef} />
    );
};

export default memo(forwardRef(Textarea));