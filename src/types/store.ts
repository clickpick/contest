export enum ActionTypes {
    USER_AUTH_REQUEST = 'USER_AUTH_REQUEST',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_FAILURE = 'USER_AUTH_FAILURE',

    GOALS_REQUEST = 'GOALS_REQUEST',
    GOALS_SUCCESS = 'GOALS_SUCCESS',
    GOALS_FAILURE = 'GOALS_FAILURE',
    SET_GOAL = 'SET_GOAL',

    SET_MAIN_VIEW_PANEL = 'SET_MAIN_VIEW_PANEL',
    SET_CREATE_GOAL_PANEL = 'SET_CREATE_GOAL_PANEL',

    STARTED_GOALS_REQUEST = 'STARTED_GOALS_REQUEST',
    STARTED_GOALS_SUCCESS = 'STARTED_GOALS_SUCCESS',
    STARTED_GOALS_FAILURE = 'STARTED_GOALS_FAILURE',
    STARTED_GOALS_CREATED = 'STARTED_GOALS_CREATED',

    STARTED_GOALS_PHOTO_LOADED = 'STARTED_GOALS_PHOTO_LOADED'
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
    readonly startedGoalId: number | false
    readonly daysCount: number,
    readonly isFriend: boolean
}

export interface UserWithGoal extends User {
    readonly startedGoal: StartedGoalWithGoal | false
}

export interface UserState extends DataState {
    readonly data: User | null
}

export interface UserWithGoalState extends DataState {
    readonly data: UserWithGoal | null
}

/* Goals */
export interface Goal {
    readonly id: number,
    readonly emoji: string,
    readonly title: string
}

export interface Goals extends EntitiesObject<Goal> { }
export type GoalIds = IdsArray | null;

export type SelectedGoal = 'all' | number;

export interface GoalsState extends DataState {
    readonly goalIds: GoalIds,
    readonly goals: Goals,
    readonly selectedGoal: SelectedGoal
}

export interface Photo {
    id: number,
    link: string,
    createdAt: string
}

/* StartedGoals */
export interface StartedGoal {
    readonly id: number,
    readonly score: number,
    readonly likesCount: number,
    readonly photosCount: number,
    readonly comment: string,
    readonly globalTop: number,
    readonly goalTop: number,
    readonly isLiked: boolean,
    readonly needPhoto: boolean,
    readonly user: User,
    readonly goalId: number,
    readonly photo: Photo | null
}

export interface StartedGoalWithGoal extends StartedGoal {
    readonly goal: Goal
}

export interface StartedGoals extends EntitiesObject<StartedGoal> { }
export interface StartedGoalsWithGoal extends EntitiesObject<StartedGoalWithGoal> { }
export type StartedGoalIds = IdsArray | null;

export interface StartedGoalsState extends DataState {
    readonly goalIds: StartedGoalIds,
    readonly goals: StartedGoals
}

export interface StartedGoalsWithGoalState extends DataState {
    readonly goalIds: StartedGoalIds,
    readonly goals: StartedGoalsWithGoal
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

export interface SetGoal {
    type: ActionTypes.SET_GOAL,
    goal: SelectedGoal
}

/* Goals */
export interface StartedGoalsLoad {
    type: ActionTypes.STARTED_GOALS_REQUEST
}

export interface StartedGoalsSuccess {
    type: ActionTypes.STARTED_GOALS_SUCCESS,
    payload: {
        entities: { startedGoals: StartedGoals },
        result: IdsArray
    }
}

export interface StartedGoalsFailure {
    type: ActionTypes.STARTED_GOALS_FAILURE,
    error: string
}

export interface StartedGoalCreated {
    type: ActionTypes.STARTED_GOALS_CREATED,
    payload: {
        entities: { startedGoals: StartedGoals },
        result: number
    }
}

export interface StartedGoalsPhotoLoaded {
    type: ActionTypes.STARTED_GOALS_PHOTO_LOADED,
    payload: { result: Photo },
    propsWithSuccess: {
        goalId: number
    }
}