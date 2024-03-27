import './Header.scss';
import CONSTANTS from '@utils/constants';
import { SettingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { GetTariffListThunk } from '@redux/thunk/userThunks';

export const ProfileHeader = () => {
    const dispatch = useAppDispatch();

    const goToSettings = () => {
        dispatch(GetTariffListThunk());
        dispatch(push(`${CONSTANTS.ROUTER__PATH.SETTINGS__PATH}`));
    };

    return (
        <header className='profile-header'>
            <h4 className='profile-header__title'>Профиль</h4>
            <button
                className='header__info-settings-btn'
                data-test-id='header-settings'
                onClick={goToSettings}
            >
                <SettingOutlined />
                <p>Настройки</p>
            </button>
        </header>
    );
};
