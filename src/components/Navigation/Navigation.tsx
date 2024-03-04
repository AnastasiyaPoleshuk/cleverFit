import './Navigation.scss';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import React, { useState } from 'react';

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
    getItem('Календарь', '1', <CalendarIcon />),
    getItem('Тренировки', '2', <WorkoutIcon />),
    getItem('Достижения', '3', <AchievementsIcon />),
    getItem('Профиль', '4', <ProfileIcon />),
];

export const Navigation: React.FC = () => {
    const [collapsed, setCollapsed] = useState(window.innerWidth <= 360);
    const [width, setIsMobile] = useState(window.innerWidth);
    const router = useAppSelector((state) => state.router);

    const dispatch = useAppDispatch();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
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
                    data-test-id={width <= 360 ? 'sider-switch-mobile' : 'sider-switch'}
                >
                    {collapsed ? (
                        <MenuUnfoldOutlined className='menu-btn__icon' style={{ color: '#8C8C8C' }} />
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
                />
            </div>
            <Button
                type='link'
                className={`nav__button-exit ${
                    router.location?.pathname === CONSTANTS.ROUTER__PATH.FEEDBACKS__PATH
                        ? 'nav__button-exit-feedbacks'
                        : null
                }`}
                onClick={logOut}
            >
                {collapsed ? (
                    <ExitIcon />
                ) : (
                    <>
                        <ExitIcon />
                        <span>Выход</span>
                    </>
                )}
            </Button>
        </div>
    );
};
