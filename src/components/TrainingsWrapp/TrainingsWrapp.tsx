import { Tabs } from 'antd';
import './TrainingsWrapp.scss';
import { JoingTraining } from './TrainingsTabContent/JoingTraining/JoingTraining';
import { Maraphon } from './TrainingsTabContent/Maraphon/Maraphon';
import { MyTrainings } from './TrainingsTabContent/MyTrainings/MyTrainings';

export const TrainingsWrapp = () => {
    return (
        <div className='trainings-wrapp'>
            <Tabs
                defaultActiveKey='1'
                tabBarStyle={{ justifyContent: 'space-between' }}
                className='tab__bar'
            >
                <Tabs.TabPane tab={<h3 className='tab__bar-title'>Мои тренировки</h3>} key='1'>
                    <MyTrainings />
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={<h3 className='tab__bar-title'>Совместные тренировки</h3>}
                    key='2'
                >
                    <JoingTraining />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<h3 className='tab__bar-title'>Марафоны</h3>} key='3'>
                    <Maraphon />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};
