import { schema } from 'normalizr';

export const goal = new schema.Entity('goals');
export const arrayOfGoals = new schema.Array(goal);

export const startedGoal = new schema.Entity(
    'startedGoals',
    { goalId: goal },
    {
        processStrategy: (entity) => {
            const goalId = entity.goal;
            delete entity.goal;

            return { ...entity, goalId };
        }
    }
);
export const arrayOfStartedGoals = new schema.Array(startedGoal);