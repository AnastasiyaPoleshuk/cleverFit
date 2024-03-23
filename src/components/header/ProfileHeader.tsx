import './Header.scss';
import CONSTANTS from '@utils/constants';
import { SettingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';

export const ProfileHeader = () => {
    const dispatch = useAppDispatch();

    return (
        <header className='profile-header'>
            <h4 className='profile-header__title'>Профиль</h4>
            <button
                className='header__info-settings-btn'
                data-test-id='header-settings'
                onClick={() => dispatch(push(`${CONSTANTS.ROUTER__PATH.SETTINGS__PATH}`))}
            >
                <SettingOutlined />
                <p>Настройки</p>
            </button>
        </header>
    );
};
