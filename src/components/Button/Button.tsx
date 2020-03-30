import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { Button as IButton, HasChildren } from '../../types/props';

import Caption from '../Caption';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, HasChildren, IButton { }

const Button: FC<ButtonProps> = ({
    className,
    priority,
    shape,
    size,
    before,
    children,
    ...restProps
}: ButtonProps) => {
    const hasNotPressed = useMemo(() => restProps['aria-pressed'] === false, [restProps]);

    const classNames = useMemo(() => {
        let classNames = cn(className, 'Button', 'Bs(bb)', 'Bs(bb)--all');

        if (shape === 'circle') {
            return cn(classNames, 'Button--primary', 'Button--circle', 'padding-blue');
        }

        return cn(classNames, {
            [`Button--${priority}`]: priority,
            'Button--unselect': hasNotPressed,
            [`Button--${shape}`]: shape,
            [`Button--${size}`]: size,
            'padding-green--tb padding-orange--rl': shape === 'round' && size === 'medium',
            'padding-yellow': shape === 'round' && size === 'small'
        });
    }, [className, priority, shape, size, hasNotPressed]);

    const beforeView = useMemo(() => (before && shape === 'round') &&
        <span className="Button__before margin-aqua--right" children={before} />,
        [before, shape]);

    const contentView = useMemo(() => (children) &&
        React.createElement(
            ((size === 'small')) ? Caption : 'span',
            { className: 'Button__content' },
            children
        ), [children, size]);

    return (
        <button className={classNames} {...restProps}>
            {beforeView}
            {contentView}
        </button>
    );
};

Button.defaultProps = {
    priority: 'primary',
    shape: 'round',
    size: 'medium'
};

export default memo(Button);