import { IGetTrainingsResponse } from '../../../types/apiTypes';
import moment from 'moment';
import { filter, groupBy, map, sumBy, flatMap } from 'lodash';

export const calculateWeight = (trainings: IGetTrainingsResponse[], type: string) => {
    let id = 1;
    const daysOfWeek = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];
    const trainingsByDay = groupBy(filter(trainings, { name: type }), (t) => moment(t.date).day());
    const trainingsByDayAll = groupBy(trainings, (t) => moment(t.date).day());

    if (Object.keys(trainingsByDay).length === 0) {
        return map(daysOfWeek, (day, index) => {
            const exercises = flatMap(trainingsByDayAll[index], 'exercises');
            const totalWeight = sumBy(exercises, 'weight');

            return {
                id: id++,
                weekDay: day,
                weight: totalWeight,
            };
        });
    } else {
        return map(daysOfWeek, (day, index) => {
            const exercises = flatMap(trainingsByDay[index], 'exercises');
            const totalWeight = sumBy(exercises, 'weight');

            return {
                id: id++,
                weekDay: day,
                weight: totalWeight,
            };
        });
    }
};
