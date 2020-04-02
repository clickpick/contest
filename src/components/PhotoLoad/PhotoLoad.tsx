import React, { FC, useRef, useMemo, useCallback, memo } from 'react';
import cn from 'classnames';

import CircleButton from '../CircleButton';
import Button from '../Button';

import { ReactComponent as IconPlus } from '../../svg/plus.svg';

export interface PhotoLoadProps {
    className?: string,
    shape?: 'range' | 'circle',
    goalId: number,
    onChange?(goalId: number, file: any): void
}

const PhotoLoad: FC<PhotoLoadProps> = ({ className, shape, goalId, onChange }: PhotoLoadProps) => {
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
            {(shape === 'circle')
                ? <CircleButton icon={<IconPlus />}>Добавить<br />фотоотчёт</CircleButton>
                : <Button priority='secondary'>Добавить фотоотчёт</Button>}
        </label>
    );
};

PhotoLoad.defaultProps = {
    shape: 'circle'
}

export default memo(PhotoLoad);