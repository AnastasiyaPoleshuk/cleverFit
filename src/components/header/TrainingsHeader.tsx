import { Breadcrumb, Button } from 'antd';
import './Header.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { GetTariffListThunk } from '@redux/thunk/userThunks';
import CONSTANTS from '@utils/constants';
import { useState, useEffect } from 'react';
import { push } from 'redux-first-history';
import { SettingOutlined } from '@ant-design/icons';
import { routerSelector } from '@utils/StoreSelectors';

export const TrainingsHeader = () => {
    const [pageName, setPageName] = useState('');
    const dispatch = useAppDispatch();
    const router = useAppSelector(routerSelector);

    useEffect(() => {
        switch (router.location?.pathname) {
            case CONSTANTS.ROUTER__PATH.FEEDBACKS__PATH:
                setPageName('Отзывы пользователей');
                break;
            case CONSTANTS.ROUTER__PATH.CALENDAR__PATH:
                setPageName('Календарь');
                break;
            case CONSTANTS.ROUTER__PATH.PROFILE__PATH:
                setPageName('Профиль');
                break;
            case CONSTANTS.ROUTER__PATH.TRAININGS__PATH:
                setPageName('Тренировки');
                break;

            default:
                setPageName('');
                break;
        }
    }, []);

    const goToSettings = () => {
        dispatch(GetTariffListThunk());
        dispatch(push(CONSTANTS.ROUTER__PATH.SETTINGS__PATH));
    };
    return (
        <header className='trainings__header'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Button
                        type='link'
                        onClick={() => dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH))}
                        className='header__main-link_btn'
                    >
                        Главная
                    </Button>
                </Breadcrumb.Item>
                {pageName && <Breadcrumb.Item>{pageName}</Breadcrumb.Item>}
            </Breadcrumb>
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
