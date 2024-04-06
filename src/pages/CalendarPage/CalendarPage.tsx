import { Header } from '@components/header/Header';
import './CalendarPage.scss';

import { CalengarWrapp } from '@components/CalengarWrapp/CalengarWrapp';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setToken, changeAuthState } from '@redux/slices/UserSlice';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';
import { GetTrainingInfoThunk, GetTrainingListThunk } from '@redux/thunk/TrainingThunk';
import { GetTrainingsListFail } from '@components/ErrorModals/GetTrainingsListFail';
import { AppContext } from '../../context/AppContext';
import {
    changeGetTrainingInfoErrorState,
    changeGetTrainingInfoSuccessState,
    changeGetTrainingListErrorState,
    cleanError,
} from '@redux/slices/CalendarSlice';
import { IGetTrainingsResponse } from '../../types/apiTypes';
import { UserSelector } from '@utils/StoreSelectors';

export const CalendarPage = () => {
    const [trainings, setTrainings] = useState<IGetTrainingsResponse[]>([]);
    const { isAuth, accessToken } = useAppSelector(UserSelector);
    const { isRepeatRequestNeeded, setStateOfRepeatRequest } = useContext(AppContext);
    const { isGetTrainingInfoSuccess, isGetTrainingListError, trainingInfo } = useAppSelector(
        (state) => state.calendar,
    );
    const dispatch = useAppDispatch();

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
            dispatch(changeGetTrainingListErrorState(false));
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

    const clearErrOfGetTrainingsList = () => {
        dispatch(changeGetTrainingListErrorState(false));

        dispatch(changeGetTrainingInfoErrorState(false));
        dispatch(changeGetTrainingInfoSuccessState(false));
        dispatch(cleanError());
    };

    useLayoutEffect(() => {
        if (isGetTrainingListError) {
            GetTrainingsListFail(setStateOfRepeatRequest, clearErrOfGetTrainingsList);
        }
    }, [isGetTrainingListError]);

    return (
        <div className='calendar__page'>
            <Header />
            <CalengarWrapp trainings={trainings} />
        </div>
    );
};
