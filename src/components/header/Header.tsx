import './Header.scss';
import { SettingOutlined } from '@ant-design/icons';
import CONSTANTS from '@utils/constants';
import { Breadcrumb, Button } from 'antd';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useState, useEffect } from 'react';
import { GetTariffListThunk } from '@redux/thunk/userThunks';
import { routerSelector } from '@utils/StoreSelectors';

export const Header = () => {
    const [pageName, setPageName] = useState('');
    const [isMain, setIsMain] = useState(false);
    const dispatch = useAppDispatch();
    const router = useAppSelector(routerSelector);

    useEffect(() => {
        switch (router.location?.pathname) {
            case CONSTANTS.ROUTER__PATH.FEEDBACKS__PATH:
                setPageName('Отзывы пользователей');
                setIsMain(false);
                break;
            case CONSTANTS.ROUTER__PATH.CALENDAR__PATH:
                setPageName('Календарь');
                setIsMain(false);
                break;
            case CONSTANTS.ROUTER__PATH.PROFILE__PATH:
                setPageName('Профиль');
                setIsMain(false);
                break;

            default:
                setPageName('');
                setIsMain(true);
                break;
        }
    }, []);

    const goToSettings = () => {
        dispatch(GetTariffListThunk());
        dispatch(push(`${CONSTANTS.ROUTER__PATH.SETTINGS__PATH}`));
    };
    return (
        <header className='header'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Button
                        type='link'
                        onClick={() => dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`))}
                        className='header__main-link_btn'
                    >
                        Главная
                    </Button>
                </Breadcrumb.Item>
                {pageName && <Breadcrumb.Item>{pageName}</Breadcrumb.Item>}
            </Breadcrumb>
            {isMain || router.location?.pathname === CONSTANTS.ROUTER__PATH.CALENDAR__PATH ? (
                <div className='header__info-box'>
                    {isMain ? (
                        <p className='header__info-text'>
                            Приветствуем тебя в CleverFit — приложении,
                            <br /> которое поможет тебе добиться своей мечты!
                        </p>
                    ) : (
                        <i />
                    )}

                    <button
                        className='header__info-settings-btn'
                        data-test-id='header-settings'
                        onClick={goToSettings}
                    >
                        <SettingOutlined />
                        <p>Настройки</p>
                    </button>
                </div>
            ) : (
                ''
            )}
        </header>
    );
};
