import React, { FC, useMemo, memo } from 'react';
import cn from 'classnames';

import Card from '../Card';
import Group from '../Group';
import Caption from '../Caption';

export interface StatisticsProps {
    className?: string,
    likesCount: number,
    photosCount: number,
    globalTop: number,
    goalTop: number,
    daysCount: number
}

const Statistics: FC<StatisticsProps> = ({ className, globalTop, goalTop, likesCount, photosCount, daysCount }: StatisticsProps) => {
    const classNames = useMemo(() => cn(className, 'Statistics padding-red--tb padding-blue--rl'), [className]);

    return (
        <Card className={classNames} priority="primary">
            <Group wrap center jcCenter>
                <Group jcCenter className="margin-pink--bottom">
                    <Group className="Statistics__item margin-pink--right" vertical center>
                        <span className="Statistics__value">{globalTop}</span>
                        <Caption className="Ta(c) color-opacity--secondary">
                            место<br />в рейтинге
                    </Caption>
                    </Group>
                    <Group className="Statistics__item" vertical center>
                        <span className="Statistics__value">{goalTop}</span>
                        <Caption className="Ta(c) color-opacity--secondary">
                            место<br />в категории
                    </Caption>
                    </Group>
                </Group>
                <Group jcCenter className="margin-pink--bottom">
                    <Group className="Statistics__item margin-pink--right" vertical center>
                        <span className="Statistics__value">{photosCount}</span>
                        <Caption className="Ta(c) color-opacity--secondary">
                            продуктивных<br />дней
                    </Caption>
                    </Group>
                    <Group className="Statistics__item" vertical center>
                        <span className="Statistics__value">{daysCount}</span>
                        <Caption className="Ta(c) color-opacity--secondary">
                            зарегистрированных<br />дней
                    </Caption>
                    </Group>
                </Group>
                <Group jcCenter>
                    <Group className="Statistics__item margin-pink--right" vertical center>
                        <span className="Statistics__value">{likesCount}</span>
                        <Caption className="Ta(c) color-opacity--secondary">
                            лайки
                    </Caption>
                    </Group>
                    <Group className="Statistics__item" vertical center>
                        <span className="Statistics__value">{photosCount}</span>
                        <Caption className="Ta(c) color-opacity--secondary">
                            фотоотчёты
                    </Caption>
                    </Group>
                </Group>
            </Group>
        </Card>
    );
};

export default memo(Statistics);