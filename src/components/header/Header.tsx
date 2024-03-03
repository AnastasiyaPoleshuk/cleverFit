import { NavLink } from 'react-router-dom';
import './Header.scss';
import { SettingOutlined } from '@ant-design/icons';

export const Header = () => {
    return (
        <header className='header'>
            <NavLink to={'/'} className='header__home-link'>
                Главная
            </NavLink>
            <div className='header__info-box'>
                <p className='header__info-text'>
                    Приветствуем тебя в CleverFit — приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </p>

                <button className='header__info-settings-btn'>
                    <SettingOutlined />
                    <p>Настройки</p>
                </button>
            </div>
        </header>
    );
};
