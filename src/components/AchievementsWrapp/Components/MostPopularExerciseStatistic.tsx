import { Badge } from 'antd';
import './Components.scss';
import { IExerciseStatistic } from '../utils/calcExercisesStatistic';

export const MostPopularExerciseStatistic = ({
    statisticData,
}: {
    statisticData: IExerciseStatistic[];
}) => {
    return (
        <section className='average-weight__section'>
            <h5 className='average-weight__title'>Самые частые упражнения по дням недели</h5>
            <ul className='average-weight__list'>
                {statisticData.map((item) => (
                    <li key={item.id} className='average-weight__list-item'>
                        <Badge count={item.id} />
                        <p className='average-weight__list-title'>{item.weekDay}</p>
                        <p className='average-weight__list-weight'>{item.exerciseName} </p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
