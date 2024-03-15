import React, { useEffect } from 'react';

import './MainPage.scss';
import { Header } from '@components/header/Header';
import { Footer } from '@components/footer/Footer';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { changeAuthState, setToken } from '@redux/slices/UserSlice';
import { Button } from 'antd';
import { GetTrainingInfoThunk, GetTrainingListThunk } from '@redux/thunk/TrainingThunk';
import {
    changeGetTrainingInfoErrorState,
    changeGetTrainingInfoSuccessState,
} from '@redux/slices/CalendarSlice';
import { cleanError } from '@redux/slices/CalendarSlice';

export const MainPage: React.FC = () => {
    const { isAuth, accessToken } = useAppSelector((state) => state.user);
    const { isGetTrainingInfoSuccess } = useAppSelector((state) => state.calendar);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isGetTrainingInfoSuccess) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.CALENDAR__PATH}`));
            dispatch(GetTrainingListThunk());
        }
    }, [isGetTrainingInfoSuccess]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            dispatch(setToken(token));
            dispatch(changeAuthState(true));
        }

        dispatch(changeGetTrainingInfoErrorState(false));
        dispatch(changeGetTrainingInfoSuccessState(false));
        dispatch(cleanError());
    }, []);

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        } else {
            dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH));
        }
    }, [isAuth]);

    return (
        <div className='main-page main'>
            <Header />
            <main className='main__section'>
                <div className='main__articles-wrapp'>
                    <article className='main__list'>
                        С CleverFit ты сможешь:
                        <ul>
                            <li className='main__list-item'>
                                — планировать свои тренировки на календаре, выбирая тип и уровень
                                нагрузки;
                            </li>
                            <li className='main__list-item'>
                                — отслеживать свои достижения в разделе статистики, сравнивая свои
                                результаты с нормами и рекордами;
                            </li>
                            <li className='main__list-item'>
                                — создавать свой профиль, где ты можешь загружать свои фото, видео и
                                отзывы о тренировках;
                            </li>
                            <li className='main__list-item'>
                                — выполнять расписанные тренировки для разных частей тела, следуя
                                подробным инструкциям и советам профессиональных тренеров.
                            </li>
                        </ul>
                    </article>
                    <article className='main__article-last'>
                        CleverFit — это не просто приложение, а твой личный помощник <br /> в мире
                        фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                    </article>
                    <div className='main__cards-block'>
                        <div className='card'>
                            <h5 className='card__title'>Расписать тренировки</h5>
                            <Button type='link' className='card__link'>
                                Тренировки
                            </Button>
                        </div>
                        <div className='card'>
                            <h5 className='card__title'>Назначить календарь</h5>
                            <Button
                                type='link'
                                className='card__link'
                                onClick={() => dispatch(GetTrainingInfoThunk(accessToken))}
                                data-test-id='menu-button-calendar'
                            >
                                Календарь
                            </Button>
                        </div>
                        <div className='card'>
                            <h5 className='card__title'>Заполнить профить</h5>
                            <Button type='link' className='card__link'>
                                Профиль
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
};
