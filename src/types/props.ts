import { ReactNode, ChangeEventHandler, SyntheticEvent } from 'react';

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

export interface Panel {
    id: string
}

export interface PanelPrimary extends Panel {
    goForward(e: SyntheticEvent<HTMLElement>): void
}

export interface PanelSecondary extends Panel {
    goBack(): void
}