import './Navigation.scss';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import React, { useEffect, useState } from 'react';

import { CalendarIcon } from './Iconscomponents/CalendarIcon';
import { ProfileIcon } from './Iconscomponents/ProfileIcon';
import { AchievementsIcon } from './Iconscomponents/AchievementsIcon';
import { WorkoutIcon } from './Iconscomponents/WorkoutIcon';
import { LogoIcon } from './Iconscomponents/LogoIcon';
import { ExitIcon } from './Iconscomponents/ExitIcon';
import { LogoShortIcon } from './Iconscomponents/LogoShortIcon';
import CONSTANTS from '@utils/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeAuthState, setToken } from '@redux/slices/UserSlice';
import { push } from 'redux-first-history';
import { MenuInfo } from 'rc-menu/lib/interface';
import { GetTrainingInfoThunk } from '@redux/thunk/TrainingThunk';
import { useResize } from '@hooks/useResize';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Календарь', CONSTANTS.SIDEBAR_KEYS.CALENDAR, <CalendarIcon />),
    getItem('Тренировки', CONSTANTS.SIDEBAR_KEYS.TRAININGS, <WorkoutIcon />),
    getItem('Достижения', CONSTANTS.SIDEBAR_KEYS.ACHIEVEMENTS, <AchievementsIcon />),
    getItem('Профиль', CONSTANTS.SIDEBAR_KEYS.PROFILE, <ProfileIcon />),
];

export const Navigation: React.FC = () => {
    const { width: windowWidth, isScreenSm } = useResize();
    const [collapsed, setCollapsed] = useState(isScreenSm);
    const { accessToken } = useAppSelector((state) => state.user);

    useEffect(() => {
        setCollapsed(isScreenSm);
    }, []);

    const dispatch = useAppDispatch();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const onMenuClicked = (item: MenuInfo) => {
        switch (item.key) {
            case CONSTANTS.SIDEBAR_KEYS.CALENDAR:
                dispatch(GetTrainingInfoThunk(accessToken));
                break;
            case CONSTANTS.SIDEBAR_KEYS.PROFILE:
                dispatch(push(`${CONSTANTS.ROUTER__PATH.PROFILE__PATH}`));
                break;

            default:
                break;
        }
    };

    const logOut = () => {
        dispatch(push(CONSTANTS.ROUTER__PATH.AUTH__PATH));
        dispatch(setToken(''));
        dispatch(changeAuthState(false));
        localStorage.removeItem('jwtToken');
    };

    return (
        <div className={`nav__menu ${collapsed ? 'collapsed__menu' : 'not-collapsed__menu'}`}>
            <div className='nav__menu-section'>
                {collapsed ? <LogoShortIcon /> : <LogoIcon />}
                <Button
                    type='text'
                    onClick={toggleCollapsed}
                    className='nav__menu-btn'
                    data-test-id={windowWidth <= 360 ? 'sider-switch-mobile' : 'sider-switch'}
                >
                    {collapsed ? (
                        <MenuUnfoldOutlined
                            className='menu-btn__icon'
                            style={{ color: '#8C8C8C' }}
                        />
                    ) : (
                        <MenuFoldOutlined className='menu-btn__icon' style={{ color: '#8C8C8C' }} />
                    )}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    theme='light'
                    inlineCollapsed={collapsed}
                    items={items}
                    className={collapsed ? 'menu__collapsed' : 'menu'}
                    onClick={(item) => onMenuClicked(item)}
                />
            </div>
            <Button type='link' className='nav__button-exit' onClick={logOut}>
                {collapsed ? (
                    <ExitIcon />
                ) : (
                    <>
                        <ExitIcon />
                        <span className='nav__button-exit_text'>Выход</span>
                    </>
                )}
            </Button>
        </div>
    );
};
