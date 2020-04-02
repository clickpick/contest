import React, { FC, useMemo, useCallback, memo } from 'react';
import cn from 'classnames';

import { StartedGoalsWithGoal } from '../../types/store';

import Group from '../Group';
import Bar from '../Bar';

export interface ChartProps {
    className?: string,
    goals: StartedGoalsWithGoal,
    goalIds: Array<number>,
    maxHeight?: number,
    profileLink?: string
    goProfile?(e: any): void
}

const Chart: FC<ChartProps> = ({ className, goals, goalIds, maxHeight = 400, profileLink, goProfile }: ChartProps) => {
    const classNames = useMemo<string>(() => cn(className, 'Chart'), [className]);
    const maxScore = useMemo(() => goals[goalIds[0]].score, [goals, goalIds]);

    const barView = useCallback((goalId: number, index: number) => {
        const goal = goals[goalId];
        const height: number = (goal.score * maxHeight) / maxScore;

        return (
            <div
                className={cn('padding-blue--right', { 'padding-blue--left': index === 0 })}
                key={index}
                data-goal-id={goalId}
                data-to={profileLink}
                onClick={goProfile}>
                <Bar
                    priority={(goal.user.isFriend) ? 'primary' : 'default'}
                    height={height}
                    position={index + 1}
                    user={goal.user}
                    goal={goal.goal} />
            </div>
        );
    }, [maxScore, maxHeight, goals, profileLink, goProfile]);


    return (
        <Group end shrink className={classNames}>
            {goalIds.concat(goalIds).concat(goalIds).concat(goalIds).map(barView)}
        </Group>
    );
};

export default memo(Chart);