import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import './Components.scss';
import { Button } from 'antd';
import { statisticType } from '../AchievementsTabComponent/Week';

export const TabHeader = ({
    changeStatisticType,
    type,
}: {
    changeStatisticType: (type: string) => void;
    type: string;
}) => {
    const { trainingList, isGetTrainingListSuccess } = useAppSelector((state) => state.calendar);
    return (
        <header className='tab-header'>
            <span className='tab-header__title'>Тип тренировки: </span>
            <div className='buttons-wrapp'>
                <Button
                    className={`tab-header__button ${
                        type === statisticType.all ? 'tab-header__button-active' : ''
                    }`}
                    onClick={() => changeStatisticType(statisticType.all)}
                >
                    Все
                </Button>

                {isGetTrainingListSuccess &&
                    trainingList.map((item, index) => (
                        <Button
                            className={`tab-header__button ${
                                type === item.key ? 'tab-header__button-active' : ''
                            }`}
                            onClick={() => changeStatisticType(item.name)}
                            key={`${item.key}${index}`}
                        >
                            {item.name}
                        </Button>
                    ))}
            </div>
        </header>
    );
};
