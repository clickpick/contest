import React, { FC, useRef, useMemo, useCallback, memo } from 'react';
import cn from 'classnames';

import CircleButton from '../CircleButton';

import { ReactComponent as IconPlus } from '../../svg/plus.svg';

export interface PhotoLoadProps {
    className?: string,
    goalId: number,
    onChange?(goalId: number, file: any): void
}

const PhotoLoad: FC<PhotoLoadProps> = ({ className, goalId, onChange }: PhotoLoadProps) => {
    const inputRef = useRef<any>(null);
    const classNames = useMemo(() => cn(className, 'PhotoLoad'), [className]);

    const handleChange = useCallback(() => {
        if (onChange) {
            onChange(goalId, inputRef.current.files[0]);
        }
    }, [goalId, onChange]);
    return (
        <label className={classNames}>
            <div className="PhotoLoad__mask" />
            <input
                className="PhotoLoad__control"
                type="file"
                ref={inputRef}
                accept="image/*"
                onChange={handleChange} />
            <CircleButton
                icon={<IconPlus />}>
                Добавить<br />фотоотчёт
            </CircleButton>
        </label>
    );
};

export default memo(PhotoLoad);