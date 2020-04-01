import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, HasChildren {
    priority?: 'primary' | 'secondary'
}

const Card: FC<CardProps> = ({ className, priority, ...restProps }: CardProps) => {
    const classNames = useMemo(() => cn(className, 'Card', `Card--${priority}`, 'Bs(bb)', 'Br(16)'), [className, priority]);

    return <div className={classNames} {...restProps} />;
};

Card.defaultProps = {
    priority: 'primary'
};

export default memo(Card);