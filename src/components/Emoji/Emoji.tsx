import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface EmojiProps extends HTMLAttributes<HTMLSpanElement>, HasChildren {
    label?: string,
    size?: 'medium' | 'large'
}

const Emoji: FC<EmojiProps> = ({ className, label, size, ...restProps }) => {
    return (
        <span
            className={cn(className, 'Emoji', `Emoji--${size}`, 'D(ib)')}
            aria-label={(label) || ''}
            {...restProps} />
    );
};

Emoji.defaultProps = {
    size: 'large'
};

export default memo(Emoji);