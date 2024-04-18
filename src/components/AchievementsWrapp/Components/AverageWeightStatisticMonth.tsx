import './Components.scss';
import { IAverageWeightMonth } from '../utils/calcWeightMonth';
import moment from 'moment';
import { groupBy } from 'lodash';
import { useResize } from '@hooks/useResize';

export const AverageWeightStatisticMonth = ({
    statisticData,
}: {
    statisticData: IAverageWeightMonth[];
}) => {
    const { isScreenSm } = useResize();

    const getWeekLists = (statisticData: IAverageWeightMonth[]) => {
        const weeksGroups = groupBy(statisticData, 'week');

        return Object.values(weeksGroups).map((weekGroup, idx) => {
            return (
                <div className='average-weight__section' style={{ marginTop: isScreenSm ? 16 : 0 }}>
                    <h5 className='average-weight__title'>
                        {`Неделя ${Object.keys(weeksGroups)[idx]}`}
                    </h5>
                    <ul className='average-weight__list' key={idx}>
                        {weekGroup.map((item, index) => {
                            return (
                                <li key={item.id} className='average-weight__list-item'>
                                    <span
                                        style={{
                                            borderRadius: '50%',
                                            padding: +item.id > 9 ? '1px 5px' : '0px 7px',
                                            background: item.weight ? '#2f54eb' : 'aliceblue',
                                            color: item.weight ? 'aliceblue' : '#2f54eb',
                                        }}
                                    >
                                        {++index}
                                    </span>
                                    <p className='average-weight__list-title'>{`${
                                        item.day
                                    }${moment().format('YYYY')}`}</p>
                                    <p className='average-weight__list-weight'>
                                        {item.weight ? `${item.weight} кг` : ' '}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };

    return (
        <section className='average-weight-month__section'>{getWeekLists(statisticData)}</section>
    );
};
