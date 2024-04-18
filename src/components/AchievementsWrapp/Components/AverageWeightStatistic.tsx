import { Badge } from 'antd';
import { IStatisticDataWeek } from '../../../types/storeTypes';
import './Components.scss';

export const AverageWeightStatistic = ({
    statisticData,
}: {
    statisticData: IStatisticDataWeek[];
}) => {
    return (
        <section className='average-weight__section'>
            <h5 className='average-weight__title'>Средняя нагрузка по дням недели</h5>
            <ul className='average-weight__list'>
                {statisticData.map((item) => (
                    <li key={item.id} className='average-weight__list-item'>
                        <Badge count={item.id} color={item.weight ? '#2f54eb' : 'aliceblue'} />
                        <p className='average-weight__list-title'>{item.weekDay}</p>
                        <p className='average-weight__list-weight'>
                            {item.weight ? `${item.weight} кг` : ' '}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
