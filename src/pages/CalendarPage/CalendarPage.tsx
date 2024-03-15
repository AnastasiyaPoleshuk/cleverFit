import { Header } from '@components/header/Header';
import './CalendarPage.scss';

import { CalengarWrapp } from '@components/CalengarWrapp/CalengarWrapp';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setToken, changeAuthState } from '@redux/slices/UserSlice';
import { useCallback, useContext, useEffect, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';
import { GetTrainingInfoThunk, GetTrainingListThunk } from '@redux/thunk/TrainingThunk';
import { GetTrainingsListFail } from '@components/ErrorModals/GetTrainingsListFail';
import { AppContext } from '../../context/AppContext';
import { changeGetTrainingListErrorState } from '@redux/slices/CalendarSlice';
import { IGetTrainingsResponse } from '../../types/apiTypes';

export const CalendarPage = () => {
    const [trainings, setTrainings] = useState<IGetTrainingsResponse[]>([]);
    const { isAuth, accessToken } = useAppSelector((state) => state.user);
    const { isRepeatRequestNeeded, setStateOfRepeatRequest } = useContext(AppContext);
    const { isGetTrainingInfoSuccess, isGetTrainingListError, trainingInfo } = useAppSelector(
        (state) => state.calendar,
    );
    const dispatch = useAppDispatch();

    const callModalWindow = useCallback(() => {
        if (isGetTrainingListError) {
            GetTrainingsListFail(setStateOfRepeatRequest);
        }
    }, [isGetTrainingListError]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            dispatch(setToken(token));
            dispatch(changeAuthState(true));
        }
    }, []);

    useEffect(() => {
        if (isGetTrainingInfoSuccess) {
            setTrainings(trainingInfo);
        }
    }, [trainingInfo]);

    useEffect(() => {
        if (isRepeatRequestNeeded) {
            changeGetTrainingListErrorState(false);
            dispatch(GetTrainingListThunk());
            setStateOfRepeatRequest(false);
        }
    }, [isRepeatRequestNeeded]);

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        } else {
            dispatch(GetTrainingInfoThunk(accessToken));
        }
    }, [isAuth]);

    useEffect(() => {
        callModalWindow();
    }, [isGetTrainingListError]);

    return (
        <div className='calendar__page'>
            <Header />
            <CalengarWrapp trainings={trainings} />
        </div>
    );
};
