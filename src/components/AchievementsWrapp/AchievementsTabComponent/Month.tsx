import { useState } from 'react';
import './TabComponents.scss';
import { statisticType } from './Week';
import { TabHeader } from '../Components/TabHeader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calcGeneralMonthStatistic } from '../utils/calcGeneralMonthStatistic';
import { getMostPopularMonthTraining } from '../utils/calcMostPopularTraining';
import { Column } from '@ant-design/charts';
import { getWeightPerDay } from '../utils/calcWeightMonth';
import { getMostPopularExercise } from '../utils/calcMostPopularExercise';
import { ExercisesStatistic } from '../Components/ExerciesesStatistic';
import { MostPopularExerciseStatistic } from '../Components/MostPopularExerciseStatistic';
import { calcExercisesStatisticMonth } from '../utils/calcExercisesStatistic';
import { getExercisesPopularity } from '../utils/getExercisesPopularity';
import { AverageWeightStatisticMonth } from '../Components/AverageWeightStatisticMonth';

export const Month = () => {
    const [trainingType, setTrainingsType] = useState<string>(statisticType.all);
    const { trainingInfo } = useAppSelector((state) => state.calendar);

    const changeStatisticType = (type: string) => {
        setTrainingsType(type);
    };

    const data = getWeightPerDay(trainingInfo, trainingType).map((training) => ({
        ...training,
        day: training.day,
    }));

    const config = {
        data: data,
        xField: 'day',
        yField: 'weight',
        style: {
            fill: '#adc6ff',
        },
        scroll: {
            x: {
                type: 'horizontal',
            },
        },
        xAxis: {
            tickCount: 7,
            tickInterval: 20,
            title: {
                text: 'Нагрузка, кг',
                align: 'center',
            },
        },
        yAxis: {
            min: 1,
            max: Math.max(...data.map((item) => item.weight)) + 20,
            tickInterval: 20,
        },
        scrollbar: {
            x: {
                ratio: 0.9,
            },
        },
    };

    return (
        <div className='month-tab'>
            <TabHeader type={trainingType} changeStatisticType={changeStatisticType} />

            <section className='month-tab__weight-block'>
                <div className='month-tab__weight-schedule'>
                    <Column {...config} />
                </div>
                <AverageWeightStatisticMonth
                    statisticData={getWeightPerDay(trainingInfo, trainingType)}
                />
            </section>

            <section className='week-tab__general-block'>
                {calcGeneralMonthStatistic(trainingInfo, trainingType).map((item) => (
                    <div className='card' key={item?.id}>
                        <h1 className='card-title'>{item?.value}</h1>
                        <p className='card-text'>{item?.text}</p>
                    </div>
                ))}
            </section>

            <section className='most-popular-data-block'>
                <ul className='most-popular-data__list'>
                    {trainingType === statisticType.all && (
                        <li className='most-popular-data__list-item'>
                            <p className='most-popular-data__list-item-title'>
                                Самая частая тренировка
                            </p>
                            <p className='most-popular-data__list-item-value'>
                                {getMostPopularMonthTraining(trainingInfo)}
                            </p>
                        </li>
                    )}

                    <li className='most-popular-data__list-item'>
                        <p className='most-popular-data__list-item-title'>
                            Самое частое упражнение
                        </p>
                        <p className='most-popular-data__list-item-value'>
                            {getMostPopularExercise(trainingInfo, trainingType)}
                        </p>
                    </li>
                </ul>
            </section>

            <section className='most-popular-exercise-block'>
                <div className='most-popular-exercise-schedule'>
                    <ExercisesStatistic exercisesStatistic={getExercisesPopularity(trainingInfo)} />
                </div>
                <MostPopularExerciseStatistic
                    statisticData={calcExercisesStatisticMonth(trainingInfo, trainingType)}
                />
            </section>
        </div>
    );
};
