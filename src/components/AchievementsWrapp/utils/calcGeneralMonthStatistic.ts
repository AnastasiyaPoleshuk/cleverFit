import { IGetTrainingsResponse } from '../../../types/apiTypes';
import { filter, sumBy, flatMap } from 'lodash';

const cardText = [
    'Общая нагрузка, кг',
    'Нагрузка в день, кг',
    'Колличество повторений, раз',
    'Подходы, раз',
];

export const calcGeneralMonthStatistic = (trainings: IGetTrainingsResponse[], type: string) => {
    const exercises = flatMap(filter(trainings, { name: type }), 'exercises');

    let totalWeight: number;
    let totalReplays: number;
    let totalApproaches: number;

    if (exercises.length) {
        totalWeight = sumBy(exercises, 'weight');
        totalReplays = sumBy(exercises, 'replays');
        totalApproaches = sumBy(exercises, 'approaches');
    } else {
        const exercises = flatMap(trainings, 'exercises');

        totalWeight = sumBy(exercises, 'weight');
        totalReplays = sumBy(exercises, 'replays');
        totalApproaches = sumBy(exercises, 'approaches');
    }

    return cardText.map((text, index) => {
        switch (index) {
            case 0:
                return {
                    id: index,
                    value: totalWeight,
                    text,
                };
            case 1:
                return {
                    id: index,
                    value: +(totalWeight / 7).toFixed(1),
                    text,
                };
            case 2:
                return {
                    id: index,
                    value: totalReplays,
                    text,
                };
            case 3:
                return {
                    id: index,
                    value: totalApproaches,
                    text,
                };

            default:
                return;
        }
    });
};
