import { TrainingsHeader } from '@components/header/TrainingsHeader';
import './TrainingsPage.scss';
import { TrainingsWrapp } from '@components/TrainingsWrapp/TrainingsWrapp';
import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { GetTrainingListThunk } from '@redux/thunk/TrainingThunk';
import CONSTANTS from '@utils/constants';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { push } from 'redux-first-history';
import { AppContext } from '../../context/AppContext';
import { GetTrainingsListFail } from '@components/ErrorModals/GetTrainingsListFail';
import { changeGetTrainingListErrorState } from '@redux/slices/CalendarSlice';
import { CreateTrainingDrawer } from '@components/CreateTrainingDrawer/CreateTrainingDrawer';
import { CreateTrainingSuccess } from '@components/TrainingModals/CreateTrainingSuccess';
import { CreateTrainingFail } from '@components/ErrorModals/CreateTrainingFail';
import { UpdateTrainingFail } from '@components/ErrorModals/UpdateTrainingFail';

export const TrainingsPage = () => {
    const { isAuth } = useAppSelector((state) => state.user);
    const {
        isGetTrainingListError,
        isCreateTrainingSuccess,
        isCreateTrainingError,
        isUpdateTrainingSuccess,
        isUpdateTrainingError,
    } = useAppSelector((state) => state.calendar);
    const { isRepeatRequestNeeded, setStateOfRepeatRequest, isCreateTrainingDrawerOpen } =
        useContext(AppContext);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, [isAuth]);

    useEffect(() => {
        if (isRepeatRequestNeeded) {
            dispatch(changeGetTrainingListErrorState(false));
            dispatch(GetTrainingListThunk());
            setStateOfRepeatRequest(false);
        }
    }, [isRepeatRequestNeeded]);

    useLayoutEffect(() => {
        if (isCreateTrainingError) {
            CreateTrainingFail(() => dispatch(push(`${CONSTANTS.ROUTER__PATH.MAIN__PATH}`)));
        }

        if (isUpdateTrainingError) {
            UpdateTrainingFail();
        }
    }, [isCreateTrainingError, isUpdateTrainingError]);

    useLayoutEffect(() => {
        if (isGetTrainingListError) {
            GetTrainingsListFail(setStateOfRepeatRequest);
        }
    }, [isGetTrainingListError]);

    return (
        <div className='trainings-page'>
            <TrainingsHeader />
            <TrainingsWrapp />

            <CreateTrainingDrawer isDrawerOpen={isCreateTrainingDrawerOpen} />
            {isCreateTrainingSuccess && (
                <CreateTrainingSuccess title={CONSTANTS.CREATE_TRAINING_SUCCESS} />
            )}
            {isUpdateTrainingSuccess && (
                <CreateTrainingSuccess title={CONSTANTS.UPDATE_TRAINING_SUCCESS} />
            )}
        </div>
    );
};
