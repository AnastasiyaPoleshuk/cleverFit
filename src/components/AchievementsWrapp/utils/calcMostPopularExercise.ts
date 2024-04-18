import { IGetTrainingsResponse } from '../../../types/apiTypes';
import { filter, flatMap, groupBy, maxBy, values } from 'lodash';
import { statisticType } from '../AchievementsTabComponent/Week';

export const getMostPopularExercise = (
    trainings: IGetTrainingsResponse[],
    type: string,
): string | null => {
    const currentTrainings =
        type === statisticType.all ? trainings : filter(trainings, { name: type });
    const allExercises = flatMap(currentTrainings, 'exercises');

    const groupedExercises = groupBy(allExercises, 'name');
    const mostPopularGroupName = maxBy(values(groupedExercises), (group) => group.length);

    return mostPopularGroupName ? mostPopularGroupName[0].name : null;
};
