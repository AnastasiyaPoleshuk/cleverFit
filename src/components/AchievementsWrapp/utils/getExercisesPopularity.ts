import { IGetTrainingsResponse } from '../../../types/apiTypes';
import { flatMap, groupBy, map, orderBy } from 'lodash';

export type ExerciseRating = {
    id: string;
    percent: number;
    trainingName: string;
};

export const getExercisesPopularity = (trainings: IGetTrainingsResponse[]): ExerciseRating[] => {
    const allExercises = flatMap(trainings, 'exercises');
    const groupedExercises = groupBy(allExercises, 'name');

    const totalExercisesCount = allExercises.length;

    const exerciseRatings = map(groupedExercises, (exercises, key) => {
        return {
            id: key,
            percent: (exercises.length / totalExercisesCount) * 100,
            trainingName: key,
        };
    });

    return orderBy(exerciseRatings, 'percent', 'desc');
};
