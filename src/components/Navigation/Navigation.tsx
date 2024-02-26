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
import { NavLink } from 'react-router-dom';
import CONSTANTS from '@utils/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changeAuthState, setToken } from '@redux/slices/UserSlice';

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
    const [collapsed, setCollapsed] = useState(false);
    const [width, setIsMobile] = useState(window.innerWidth);
    const dispatch = useAppDispatch();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const logOut = () => {
        dispatch(setToken(''));
        dispatch(changeAuthState(false));
        localStorage.removeItem('jwtToken');
    };

    return (
        <div className={`nav__menu ${collapsed ? 'collapsed__menu' : 'not-collapsed__menu'}`}>
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
            ></Menu>
            <NavLink
                to={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`}
                className='nav__button-exit'
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
            </NavLink>
        </div>
    );
};
