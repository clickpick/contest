import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

export interface PhotoProps extends HTMLAttributes<HTMLDivElement> {
    photo?: string | null
}

const Photo: FC<PhotoProps> = ({ className, photo, style, ...restProps }: PhotoProps) => {
    const classNames = useMemo(() => cn(className, 'Photo', 'Br(16)', 'Bs(bb)'), [className]);
    const styles = useMemo(() => ({ ...style, backgroundImage: `url(${photo})` }), [style, photo]);

    if (!photo) {
        return null;
    }

    return <div className={classNames} style={styles} {...restProps} />
};

export default memo(Photo);