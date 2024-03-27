import { Button, Switch, Tooltip } from 'antd';
import freeTariff from '../../../public/assets/png/free.png';
import PROTariffDisable from '../../../public/assets/png/pro disable.png';
import PROTariffAble from '../../../public/assets/png/pro able.png';
import './SettingsWrapp.scss';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';
import { AppContext } from '../../context/AppContext';
import { UpdateUserThunk } from '@redux/thunk/userThunks';
import { GetFeedbacksThunk } from '@redux/thunk/feedbacksThunk';
import moment from 'moment';

export const SettingsWrapp = () => {
    const [isPROActive, setIsPROActive] = useState(false);
    const { user, accessToken, isPostTariffSuccess } = useAppSelector((state) => state.user);

    const { openModal, setTariffDrawerStatus } = useContext(AppContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.tariff) {
            setIsPROActive(true);
        }
    }, []);

    useEffect(() => {
        if (isPostTariffSuccess) {
            openModal(CONSTANTS.CHANGE_TARIFF_INFO_MODAL);
        }
    }, [isPostTariffSuccess]);

    const checkFeedback = () => {
        dispatch(GetFeedbacksThunk(accessToken));
        dispatch(push(CONSTANTS.ROUTER__PATH.FEEDBACKS__PATH));
    };

    return (
        <div className='settings-wrapp'>
            <h4 className='settings-wrapp__title'>Мой тариф</h4>

            <div className='tariff__content'>
                <div className='tariff__card card'>
                    <header className='card__header'>
                        <h5 className='card__header-title'>FREE tarif</h5>
                        <Button
                            type='link'
                            className='card__header-button'
                            onClick={() => setTariffDrawerStatus(true)}
                        >
                            Подробнее
                        </Button>
                    </header>
                    <img src={freeTariff} alt='free tariff image' className='card__img' />
                    <footer className='card__footer'>
                        <span className='card__footer-text'>активен</span> <CheckOutlined />
                    </footer>
                </div>
                <div className='tariff__card card' data-test-id='pro-tariff-card'>
                    <header className='card__header'>
                        <h5 className='card__header-title'>PRO tarif</h5>
                        <Button
                            type='link'
                            className='card__header-button'
                            onClick={() => setTariffDrawerStatus(true)}
                        >
                            Подробнее
                        </Button>
                    </header>
                    <img
                        src={isPROActive ? PROTariffAble : PROTariffDisable}
                        alt='free tariff image'
                        className='card__img'
                    />
                    <footer className='card__footer'>
                        {isPROActive ? (
                            <span className='card__footer-text'>
                                Активен до {moment(user.tariff.expired).format('DD.MM')}
                            </span>
                        ) : (
                            <Button
                                type='primary'
                                className='card__footer-button'
                                data-test-id='activate-tariff-btn'
                            >
                                Активировать
                            </Button>
                        )}
                    </footer>
                </div>
            </div>
            <div className='advantages__box'>
                <div className='advantage-item'>
                    <div className='advantage-item__title-box'>
                        <p className='advantage-item__title'>Открыт для совместных тренировок</p>
                        <Tooltip
                            placement='bottomLeft'
                            title={
                                'включеная функция позволит участвовать в совместных тренировках'
                            }
                        >
                            <ExclamationCircleOutlined
                                data-test-id='tariff-trainings-icon'
                                className='advantage-item__icon'
                            />
                        </Tooltip>
                    </div>
                    <Switch
                        data-test-id='tariff-trainings'
                        checked={user.readyForJointTraining}
                        onChange={(checked) =>
                            dispatch(
                                UpdateUserThunk({
                                    email: user.email,
                                    readyForJointTraining: checked,
                                }),
                            )
                        }
                    />
                </div>
                <div className='advantage-item'>
                    <div className='advantage-item__title-box'>
                        <p className='advantage-item__title'>Уведомления</p>
                        <Tooltip
                            placement='bottomLeft'
                            title={'включеная функция позволит получать уведомления об активностях'}
                        >
                            <ExclamationCircleOutlined data-test-id='tariff-notifications-icon' />
                        </Tooltip>
                    </div>
                    <Switch
                        data-test-id='tariff-notifications'
                        checked={user.sendNotification}
                        onChange={(checked) =>
                            dispatch(
                                UpdateUserThunk({
                                    email: user.email,
                                    sendNotification: checked,
                                }),
                            )
                        }
                    />
                </div>
                <div className='advantage-item'>
                    <div className='advantage-item__title-box'>
                        <p
                            className={`advantage-item__title ${
                                isPROActive ? '' : 'advantage-item__disabled'
                            }`}
                        >
                            Темная тема
                        </p>
                        <Tooltip
                            placement='bottomLeft'
                            title={'темная тема доступна для PRO tarif'}
                        >
                            <ExclamationCircleOutlined data-test-id='tariff-theme-icon' />
                        </Tooltip>
                    </div>
                    <Switch disabled={isPROActive ? false : true} data-test-id='tariff-theme' />
                </div>

                <div className='feedbacks-btns__wrapp'>
                    <Button
                        type='primary'
                        onClick={() => openModal(CONSTANTS.CREATE_FEEDBACK_MODAL)}
                        className='feedbacks-wrapp__btn'
                        data-test-id='write-review'
                    >
                        Написать отзыв
                    </Button>
                    <Button
                        type='link'
                        onClick={checkFeedback}
                        className='feedbacks-wrapp__btn'
                        data-test-id='all-reviews-button'
                    >
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>
        </div>
    );
};
