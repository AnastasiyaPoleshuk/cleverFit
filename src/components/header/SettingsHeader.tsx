import './Header.scss';
import CONSTANTS from '@utils/constants';
import { SettingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';

export const SettingsHeader = () => {
    const dispatch = useAppDispatch();

    return (
        <header className='profile-header'>
            <h4 className='profile-header__title'>Настройки</h4>
        </header>
    );
};
