import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import './TabComponents.scss';
import { useState } from 'react';
import { TabHeader } from '../Components/TabHeader';
import { AverageWeightStatistic } from '../Components/AverageWeightStatistic';
import { calculateWeight } from '../utils/calcWeightWeek';
import { Column } from '@ant-design/charts';
import { calcGeneralStatistic } from '../utils/calcGeneralStatistic';
import { MostPopularExerciseStatistic } from '../Components/MostPopularExerciseStatistic';
import { getMostPopularTraining } from '../utils/calcMostPopularTraining';
import { getMostPopularExercise } from '../utils/calcMostPopularExercise';
import { ExercisesStatistic } from '../Components/ExerciesesStatistic';
import { getExercisesPopularity } from '../utils/getExercisesPopularity';
import { calcExercisesStatistic } from '../utils/calcExercisesStatistic';

export enum statisticType {
    all = 'all',
    legs = 'Ноги ',
    hands = 'Руки',
    strength = 'Силовая',
    back = 'Спина',
    chest = 'Грудь',
}

export const Week = () => {
    const [trainingType, setTrainingsType] = useState<string>(statisticType.all);
    const { trainingInfo } = useAppSelector((state) => state.calendar);

    const changeStatisticType = (type: string) => {
        setTrainingsType(type);
    };

    const config = {
        data: calculateWeight(trainingInfo, trainingType),
        xField: 'weekDay',
        yField: 'weight',
        seriesField: 'weekDay',
        yAxis: {
            min: 1,
            tickInterval: 20,
        },
        xAxis: {
            type: 'timeCat',
            tickCount: 7,
        },
        color: '#597ef7',
        meta: {
            weekDay: {
                alias: 'День недели',
            },
            weight: {
                alias: 'Нагрузка, кг',
            },
        },
        columnStyle: {
            radius: [10, 10, 0, 0],
        },

        title: {
            visible: true,
            text: 'Нагрузка, кг',
            alignTo: 'middle',
            position: 'bottom',
        },
        padding: 'auto',
        smooth: true,
    };

    return (
        <div className='week-tab'>
            <TabHeader type={trainingType} changeStatisticType={changeStatisticType} />

            <section className='week-tab__weight-block'>
                <div className='week-tab__weight-schedule'>
                    <Column {...config} />
                </div>
                <AverageWeightStatistic
                    statisticData={calculateWeight(trainingInfo, trainingType)}
                />
            </section>

            <section className='week-tab__general-block'>
                {calcGeneralStatistic(trainingInfo, trainingType).map((item) => (
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
                                {getMostPopularTraining(trainingInfo)}
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
                    statisticData={calcExercisesStatistic(trainingInfo, trainingType)}
                />
            </section>
        </div>
    );
};
