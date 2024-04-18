import { IGetTrainingsResponse } from '../../../types/apiTypes';
import _ from 'lodash';
import moment from 'moment';

export type IExerciseStatistic = {
    id: string;
    weekDay: string;
    exerciseName: string;
};

export const calcExercisesStatistic = (trainings: IGetTrainingsResponse[], type: string) => {
    const daysOfWeek = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];

    const lastMonday = moment().startOf('isoWeek');

    const relevantTrainings = trainings.filter((t) => t.name === type).length
        ? trainings.filter((t) => t.name === type)
        : trainings;

    const exercisesByDay = {
        Понедельник: [],
        Вторник: [],
        Среда: [],
        Четверг: [],
        Пятница: [],
        Суббота: [],
        Воскресенье: [],
    };
    relevantTrainings.forEach((t) => {
        const trainingDate = moment(t.date);
        if (trainingDate.isSameOrAfter(lastMonday)) {
            const weekday = daysOfWeek[moment(t.date).isoWeekday() - 1];
            exercisesByDay[weekday].push(...t.exercises.map((e) => e.name));
        }
    });

    const result = Object.entries(exercisesByDay).map(([weekday, exercises], i) => {
        const mostFrequentExercise = _(exercises).countBy().entries().maxBy(_.last);
        return {
            id: (i + 1).toString(),
            weekDay: weekday,
            exerciseName: mostFrequentExercise ? mostFrequentExercise[0] : '',
        };
    });

    return result;
};

export const calcExercisesStatisticMonth = (trainings: IGetTrainingsResponse[], type: string) => {
    const daysOfWeek = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ];
    const fourWeeksAgo = moment().subtract(4, 'weeks').startOf('isoWeek').format('YYYY-MM-DD');

    const relevantTrainings = trainings.filter((t) => t.name === type).length
        ? trainings.filter((t) => t.name === type)
        : trainings;
    const exercisesByDaysOfWeek = {
        Понедельник: [],
        Вторник: [],
        Среда: [],
        Четверг: [],
        Пятница: [],
        Суббота: [],
        Воскресенье: [],
    };

    relevantTrainings.forEach((t) => {
        const weekday = daysOfWeek[moment(t.date).isoWeekday() - 1];
        const trainingDate = moment(t.date).format('YYYY-MM-DD');
        if (trainingDate >= fourWeeksAgo && daysOfWeek.indexOf(weekday) !== -1) {
            exercisesByDaysOfWeek[weekday].push(...t.exercises.map((e) => e.name));
        }
    });

    const result = Object.entries(exercisesByDaysOfWeek).map(([weekday, exercises], i) => {
        const mostFrequentExercise = _(exercises).countBy().entries().maxBy(_.last);
        return {
            id: (i + 1).toString(),
            weekDay: weekday,
            exerciseName: mostFrequentExercise ? mostFrequentExercise[0] : '',
        };
    });

    return result;
};
