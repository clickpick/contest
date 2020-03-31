import { schema } from 'normalizr';

export const goal = new schema.Entity('goals');
export const arrayOfGoals = new schema.Array(goal);