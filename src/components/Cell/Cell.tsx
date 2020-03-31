import React, { FC, HTMLAttributes, ReactNode, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

import Caption from '../Caption';
import Footnote from '../Footnote';

export interface CellProps extends HTMLAttributes<HTMLDivElement>, HasChildren {
    size?: 'small' | 'medium',
    hCenter?: boolean
    multiline?: boolean,
    before?: ReactNode,
    header?: ReactNode,
    description?: ReactNode,
    hint?: ReactNode,
    bottomContent?: ReactNode,
    aside?: ReactNode
}

const Cell: FC<CellProps> = ({
    className, size, multiline, hCenter,
    before,
    header, children, description, hint, bottomContent,
    aside,
    ...restProps
}: CellProps) => {
    const classNames = useMemo(() =>
        cn(className, 'Cell', 'Bs(bb)', 'Bs(bb)--all', 'padding-green--tb', 'padding-blue--rl', {
            [`Cell--${size}`]: size,
            'Cell--multiline': multiline,
            'Cell--h-center': hCenter,
        }),
        [className, size, multiline, hCenter]);

    const beforeView = useMemo(() => (before) &&
        <div className="Cell__before margin-purple--right" children={before} />,
        [before]);

    const headerView = useMemo(() => (header) &&
        <Caption className="Cell__header" children={header} />,
        [header]);

    const descriptionView = useMemo(() => (description) &&
        <Footnote className="Cell__description" children={description} />,
        [description]);

    const hintView = useMemo(() => (hint) &&
        <Caption className="Cell__hint" children={hint} />,
        [hint]);

    const bottomContentView = useMemo(() => (bottomContent && size === 'medium') &&
        <div className="Cell__bottom-content" children={bottomContent} />,
        [bottomContent, size]);

    const asideView = useMemo(() => (aside) &&
        <div className="Cell__aside margin-purple--left" children={aside} />,
        [aside]);

    return (
        <div className={classNames} {...restProps}>
            {beforeView}
            <div className="Cell__main">
                {headerView}
                <div className="Cell__children body" children={children} />
                {descriptionView}
                {hintView}
                {bottomContentView}
            </div>
            {asideView}
        </div>
    );
};

Cell.defaultProps = {
    size: 'small'
};

export default memo(Cell);