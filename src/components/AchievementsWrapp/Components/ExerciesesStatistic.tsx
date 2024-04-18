import { Pie } from '@ant-design/charts';
import { ExerciseRating } from '../utils/getExercisesPopularity';
import './Components.scss';

const colorsList = [
    '#FFA39E',
    '#FF4D4F',
    '#D4380D',
    '#FFC53D',
    '#FFEC3D',
    '#BAE637',
    '#73D13D',
    '#87E8DE',
    '#40A9FF',
    '#9254DE',
    '#FFADD2',
    '#08979C',
    '#ADC6FF',
];

export const ExercisesStatistic = ({
    exercisesStatistic,
}: {
    exercisesStatistic: ExerciseRating[];
}) => {
    const data = exercisesStatistic.map((ex: ExerciseRating, index: number) => ({
        type: ex.trainingName,
        value: ex.percent,
        color: colorsList[index % colorsList.length],
    }));

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.6,
        innerRadius: 0.4,
        label: {
            connector: false,
            text: 'type',
            position: 'outside',

            style: {
                fill: '#000',
                fontSize: 12,
                fontWeight: 'bold',
            },
        },

        legend: false,
        interactions: [{ type: 'element-active' }],
    };

    return <Pie {...config} />;
};
