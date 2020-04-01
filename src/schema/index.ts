import { schema } from 'normalizr';

export const goal = new schema.Entity('goals');
export const arrayOfGoals = new schema.Array(goal);

export const startedGoal = new schema.Entity('startedGoals');
export const arrayOfStartedGoals = new schema.Array(startedGoal);