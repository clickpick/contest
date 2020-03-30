import { ReactNode, ChangeEventHandler } from 'react';

export interface HasChildren {
    children?: ReactNode
}

export interface HasOnChange<T> {
    onChange?: ChangeEventHandler<T>
}

export interface Button {
    priority?: 'primary' | 'secondary' | 'tertiary',
    shape?: 'round' | 'circle',
    size?: 'small' | 'medium',
    before?: ReactNode,
    disabled?: boolean
}