import React, { FC, useMemo, memo } from 'react';
import cn from 'classnames';

import { User, Goal } from '../../types/store';

import Group from '../Group';
import { Avatar } from '@vkontakte/vkui';
import Emoji from '../Emoji';
import Caption from '../Caption';

export interface BarProps {
    className?: string,
    priority?: 'primary' | 'default',
    height?: number,
    position?: number
    user: User,
    goal: Goal,
}

const Bar: FC<BarProps> = ({ className, priority, user, height, goal, position, ...restProps }: BarProps) => {
    const classNames = useMemo<string>(() => cn(className, 'Bar', `Bar--${priority}`), [className, priority]);

    const positionView = useMemo(() => (!!position) &&
        <Caption className="color-opacity--secondary Ta(c) padding-blue--top">{position}</Caption>, [position]);

    return (
        <Group vertical className={classNames} {...restProps}>
            <Avatar
                className="Bar__Avatar margin-purple--bottom"
                size={36}
                src={user.avatar200} />
            <div className="Bar__column" style={{ height: `${height}px` }} title={goal.title}>
                <Emoji className="Bar__Emoji" size="small" children={goal.emoji} />
            </div>
            {positionView}
        </Group>
    );
};

Bar.defaultProps = {
    priority: 'default',
    height: 100
}

export default memo(Bar);