import moment from 'moment';
import { IGetTrainingsResponse } from '../../../types/apiTypes';

export const getMostPopularTraining = (trainings: IGetTrainingsResponse[]): string | null => {
    const lastMonday = moment().startOf('isoWeek');

    const trainingCounts: Record<string, number> = {};

    trainings.forEach((training) => {
        const trainingDate = moment(training.date);

        if (trainingDate.isSameOrAfter(lastMonday)) {
            trainingCounts[training.name] = (trainingCounts[training.name] || 0) + 1;
        }
    });

    let mostPopularTraining = '';
    let maxCount = 0;

    for (const training in trainingCounts) {
        if (trainingCounts[training] > maxCount) {
            mostPopularTraining = training;
            maxCount = trainingCounts[training];
        }
    }

    return mostPopularTraining;
};

export const getMostPopularMonthTraining = (trainings: IGetTrainingsResponse[]): string => {
    const fourWeeksAgo = moment().subtract(4, 'weeks').startOf('isoWeek');

    const trainingCounts: Record<string, number> = {};

    trainings.forEach((training) => {
        const trainingDate = moment(training.date);

        if (trainingDate.isSameOrAfter(fourWeeksAgo)) {
            trainingCounts[training.name] = (trainingCounts[training.name] || 0) + 1;
        }
    });

    let mostPopularTraining = '';
    let maxCount = 0;

    for (const training in trainingCounts) {
        if (trainingCounts[training] > maxCount) {
            mostPopularTraining = training;
            maxCount = trainingCounts[training];
        }
    }

    return mostPopularTraining;
};
