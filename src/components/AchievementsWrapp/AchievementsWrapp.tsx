import { Tabs } from 'antd';
import './AchievementsWrapp.scss';
import { Week } from './AchievementsTabComponent/Week';
import { Month } from './AchievementsTabComponent/Month';

export const AchievementsWrapp = () => {
    return (
        <div className='achievements-wrapp'>
            <Tabs
                defaultActiveKey='1'
                tabBarStyle={{ justifyContent: 'space-between' }}
                className='tab__bar'
                destroyInactiveTabPane={true}
            >
                <Tabs.TabPane tab={<h3 className='tab__bar-title'>За неделю</h3>} key='1'>
                    <Week />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<h3 className='tab__bar-title'>За месяц</h3>} key='2'>
                    <Month />
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={<h3 className='tab__bar-title'>За все время (PRO)</h3>}
                    key='3'
                    disabled
                ></Tabs.TabPane>
            </Tabs>
        </div>
    );
};
