import { IGetTrainingsResponse } from '../../../types/apiTypes';
import moment from 'moment';

export type IAverageWeightMonth = {
    id: string;
    day: string;
    weight: number;
    week: string;
};

export const getWeightPerDay = (
    trainings: IGetTrainingsResponse[],
    type: string,
): IAverageWeightMonth[] => {
    const fourWeeksAgo = moment().subtract(4, 'weeks').startOf('isoWeek');

    const dailyWeight: Record<string, number> = {};

    const relevantTrainings = trainings.filter((t) => t.name === type).length
        ? trainings.filter((t) => t.name === type)
        : trainings;

    relevantTrainings.forEach((training) => {
        const trainingDate = moment(training.date);

        if (trainingDate.isSameOrAfter(fourWeeksAgo) && trainingDate < moment()) {
            training.exercises.forEach((exercise) => {
                dailyWeight[training.date] = (dailyWeight[training.date] || 0) + exercise.weight;
            });
        }
    });

    const result: IAverageWeightMonth[] = [];

    Object.keys(dailyWeight)
        .sort()
        .forEach((date, i) => {
            const day = moment(date).format('DD.MM');

            const startOfWeek = moment(date).startOf('isoWeek').format('DD.MM');
            const endOfWeek = moment(date).endOf('isoWeek').format('DD.MM');

            result.push({
                id: String(i + 1),
                day: day,
                weight: dailyWeight[date],
                week: `${startOfWeek}-${endOfWeek}`,
            });
        });

    return result;
};
