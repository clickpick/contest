import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface GroupProps extends HTMLAttributes<HTMLDivElement>, HasChildren {
    vertical?: boolean,
    wrap?: boolean,
    jcCenter?: boolean,
    center?: boolean,
    start?: boolean,
    end?: boolean,
    shrink?: boolean
}

const Group: FC<GroupProps> = ({ className, vertical, wrap, jcCenter, center, start, end, shrink, ...restProps }: GroupProps) => {
    const classNames = useMemo(() => cn(className, 'Group', {
        'Group--vertical': vertical,
        'Group--wrap': wrap,
        'Group--jc-center': jcCenter,
        'Group--center': center,
        'Group--start': start,
        'Group--end': end,
        'Group--shrink': shrink
    }), [className, vertical, wrap, jcCenter, center, start, end, shrink]);

    return <div className={classNames} {...restProps} />;
};

export default memo(Group);