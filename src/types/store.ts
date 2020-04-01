export enum ActionTypes {
    USER_AUTH_REQUEST = 'USER_AUTH_REQUEST',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_FAILURE = 'USER_AUTH_FAILURE',

    GOALS_REQUEST = 'GOALS_REQUEST',
    GOALS_SUCCESS = 'GOALS_SUCCESS',
    GOALS_FAILURE = 'GOALS_FAILURE',

    SET_MAIN_VIEW_PANEL = 'SET_MAIN_VIEW_PANEL',
    SET_CREATE_GOAL_PANEL = 'SET_CREATE_GOAL_PANEL',
}

interface EntitiesObject<T> { [index: string]: T }
type IdsArray = Array<number>;

export type Error = string | null;

export interface DataState {
    readonly pending: boolean,
    readonly error: Error
}

export interface Action {
    type: ActionTypes,
    [index: string]: any
}

/* ––––––––––––––––––––––––––––––––––––––––––––––– */

/**
 * State
 */

/* View */
export interface View<P> {
    readonly activePanel: P,
    readonly history: Array<string>
}

/* User */
export interface User {
    readonly id: number,
    readonly firstName: string,
    readonly lastName: string,
    readonly avatar200: string,
    readonly messagesAreEnabled: boolean,
    readonly notificationsAreEnabled: boolean,
    readonly startedGoalId: number | boolean
}

export interface UserState extends DataState {
    readonly data: User | null
}

/* Goals */
export interface Goal {
    readonly id: number,
    readonly emoji: string,
    readonly title: string
}

export interface Goals extends EntitiesObject<Goal> { }
export type GoalIds = IdsArray | null;

export interface GoalsState extends DataState {
    readonly goalIds: GoalIds,
    readonly goals: Goals
}

/* ––––––––––––––––––––––––––––––––––––––––––––––– */

/**
 * Actions
 */

/* View */
interface SetPanel<T, P> extends View<P> {
    type: T
}

export interface SetMainViewPanel<P> extends SetPanel<ActionTypes.SET_MAIN_VIEW_PANEL, P> { }

export interface SetCreateGoalPanel<P> extends SetPanel<ActionTypes.SET_CREATE_GOAL_PANEL, P> { }

/* User */
export interface UserAuthLoad {
    type: ActionTypes.USER_AUTH_REQUEST
}

export interface UserAuthSuccess {
    type: ActionTypes.USER_AUTH_SUCCESS,
    payload: { result: User }
}

export interface UserAuthFailure {
    type: ActionTypes.USER_AUTH_FAILURE,
    error: string
}

/* Goals */
export interface GoalsLoad {
    type: ActionTypes.GOALS_REQUEST
}

export interface GoalsSuccess {
    type: ActionTypes.GOALS_SUCCESS,
    payload: {
        entities: { goals: Goals },
        result: IdsArray
    }
}

export interface GoalsFailure {
    type: ActionTypes.GOALS_FAILURE,
    error: string
}