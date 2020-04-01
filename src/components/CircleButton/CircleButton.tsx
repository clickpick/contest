import React, {
    FC, HTMLAttributes, ReactNode,
    useMemo,
    memo
} from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

import Caption from '../Caption';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, HasChildren {
    priority?: 'primary' | 'danger' | 'default',
    icon?: ReactNode,
    href?: string,
    disabled?: boolean
}

const Button: FC<ButtonProps> = ({ className, priority, children, icon, href, disabled, ...restProps }: ButtonProps) => {
    const hasPressed = useMemo(() => restProps['aria-pressed'] === true, [restProps]);

    const classNames = useMemo(() => cn(className, 'CircleButton', 'Bs(bb)', 'Bs(bb)--all', 'padding-yellow', {
        [`CircleButton--${priority}`]: priority,
        'CircleButton--pressed': hasPressed
    }), [className, priority, hasPressed]);

    const contentView = useMemo(() =>
        <div className="CircleButton__content">
            <div className="CircleButton__icon margin-aqua--bottom" children={icon} />
            <Caption children={children} />
        </div>,
        [children, icon]);

    if (href) {
        return (
            <a
                className={classNames}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                children={contentView}
                {...restProps} />
        );
    }

    return (
        <button className={classNames} disabled={disabled} {...restProps}>
            {contentView}
        </button>
    );
};

Button.defaultProps = {
    priority: 'default'
};

export default memo(Button);