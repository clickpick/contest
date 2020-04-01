import React, {
    FC, ReactNode,
    useRef, useEffect, useMemo,
    memo
} from 'react';
import cn from 'classnames';

import { HasOnChange } from '../../types/props';

import useChange from '../../hooks/use-change';
import useFocus from '../../hooks/use-focus';

import Caption from '../Caption';
import Textarea from '../Textarea';
import Footnote from '../Footnote';

export interface TextFieldProps extends HasOnChange<HTMLTextAreaElement> {
    className?: string,
    view?: 'default' | 'promo',
    label?: ReactNode,
    placeholder?: string,
    value?: string,
    maxLength?: number,
    error?: boolean,
    hint?: ReactNode,
    autofocus?: boolean,
    aside?: ReactNode
    triggerMaxLength?: () => void
}

const TextField: FC<TextFieldProps> = ({
    className, view, autofocus,
    label,
    placeholder, value, maxLength, error, aside,
    hint,
    onChange, triggerMaxLength,
    ...restProps
}: TextFieldProps) => {
    const textarea = useChange<HTMLTextAreaElement>(value, onChange);
    const textareaRef = useRef<HTMLTextAreaElement>();
    const [focus, focusHandlers] = useFocus<HTMLTextAreaElement>(autofocus || false);

    useEffect(() => {
        if (autofocus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [autofocus, textareaRef]);

    useEffect(() => {
        if (maxLength !== undefined && triggerMaxLength && textarea.value.length === maxLength) {
            triggerMaxLength();
        }
    }, [textarea.value, maxLength, triggerMaxLength]);

    const labelView = useMemo<ReactNode | null>(() => (label) &&
        <Caption
            className={cn('TextField__label', 'margin-aqua--bottom', 'padding-yellow--rl', {
                'TextField__label--focused': focus,
                'TextField__label--tertiary': !focus && !!value
            })}
            children={label} />,
        [label, focus, value]);

    const asideView = useMemo<ReactNode | null>(() => (aside) &&
        <div className="TextField__aside margin-aqua--left" children={aside} />,
        [aside]);

    const counterView = useMemo<ReactNode | null>(() => (maxLength !== undefined) &&
        <Caption
            className={cn('TextField__counter', {
                'TextField__counter--hide': (maxLength < 10) ? false : textarea.value.length < maxLength - 10,
                'TextField__counter--max': textarea.value.length === maxLength
            })}
            children={`${textarea.value.length}/${maxLength}`} />,
        [maxLength, textarea.value]);

    const bodyView = useMemo<ReactNode | null>(() =>
        <div className={cn('TextField__body', 'padding-yellow', {
            'TextField__body--focused': focus,
            'TextField__body--error': error
        })}>
            <div className="TextField__body-in">
                <Textarea
                    placeholder={placeholder}
                    maxLength={maxLength}
                    ref={textareaRef}
                    {...textarea}
                    {...focusHandlers} />
                {asideView}
            </div>
            {counterView}
        </div>,
        [
            focus, placeholder, maxLength, error,
            textarea, textareaRef, focusHandlers,
            asideView, counterView
        ]);

    const hintView = useMemo<ReactNode | null>(() => (hint) &&
        <Footnote
            className={cn('TextField__hint', 'margin-aqua--top', 'padding-yellow--rl', {
                'TextField__hint--error': error
            })}
            children={hint} />,
        [hint, error]);

    return (
        <label className={cn('TextField', 'padding-yellow--rl', { [`TextField--${view}`]: view })} {...restProps}>
            {labelView}
            {bodyView}
            {hintView}
        </label>
    );
};

TextField.defaultProps = {
    view: 'default'
};

export default memo(TextField);