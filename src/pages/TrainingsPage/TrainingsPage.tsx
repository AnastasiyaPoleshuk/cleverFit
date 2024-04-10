import { TrainingsHeader } from '@components/header/TrainingsHeader';
import './TrainingsPage.scss';
import { TrainingsWrapp } from '@components/TrainingsWrapp/TrainingsWrapp';
import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    GetTrainingInfoThunk,
    GetTrainingListThunk,
    GetUsersForJoinTrainingThunk,
} from '@redux/thunk/TrainingThunk';
import CONSTANTS from '@utils/constants';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { push } from 'redux-first-history';
import { AppContext } from '../../context/AppContext';
import { GetTrainingsListFail } from '@components/ErrorModals/GetTrainingsListFail';
import {
    changeCreateTrainingErrorState,
    changeGetTrainingInfoErrorState,
    changeGetTrainingInfoSuccessState,
    changeGetTrainingListErrorState,
    cleanError,
} from '@redux/slices/CalendarSlice';
import {
    changeGetUsersForJointTrainingErrorState,
    cleanError as cleanTrainingError,
} from '@redux/slices/TrainingSlice';
import { CreateTrainingDrawer } from '@components/CreateTrainingDrawer/CreateTrainingDrawer';
import { CreateTrainingSuccess } from '@components/TrainingModals/CreateTrainingSuccess';
import { CreateTrainingFail } from '@components/ErrorModals/CreateTrainingFail';
import { UpdateTrainingFail } from '@components/ErrorModals/UpdateTrainingFail';
import { UserSelector, calendarSelector, trainingSelector } from '@utils/StoreSelectors';
import { JoinTrainingDrawer } from '@components/JoinTrainingDrawer/JoinTrainingDrawer';
import { MyPartnerInfoModal } from '@components/TrainingModals/MyPartnerInfoModal';
import { GetUsersFail } from '@components/TrainingModals/GetUsersFail';
import { findMostPopularWorkout } from '@utils/findMostPopularWorkout';

export const TrainingsPage = () => {
    const { isAuth, accessToken } = useAppSelector(UserSelector);
    const {
        isGetTrainingListError,
        isCreateTrainingSuccess,
        isCreateTrainingError,
        isUpdateTrainingSuccess,
        isUpdateTrainingError,
        trainingInfo,
        trainingList,
    } = useAppSelector(calendarSelector);
    const { isGetUsersForJoinTrainingError } = useAppSelector(trainingSelector);
    const {
        isRepeatRequestNeeded,
        setStateOfRepeatRequest,
        isCreateTrainingDrawerOpen,
        isCalendar,
        isJoinTrainingDrawerOpen,
        isMyTrainingPartnerInfoModalOpen,
    } = useContext(AppContext);

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

    const clearErr = () => {
        dispatch(changeCreateTrainingErrorState(false));
        dispatch(push(`${CONSTANTS.ROUTER__PATH.MAIN__PATH}`));
    };

    const repeatRequest = () => {
        dispatch(
            GetUsersForJoinTrainingThunk({
                trainingType: findMostPopularWorkout(trainingInfo, trainingList),
                accessToken,
            }),
        );
    };

    const clearErrOfGetTrainingsList = () => {
        dispatch(changeGetTrainingListErrorState(false));

        dispatch(changeGetTrainingInfoErrorState(false));
        dispatch(changeGetTrainingInfoSuccessState(false));
        dispatch(cleanError());
    };

    const clearErrorOfGetUsersForTraining = () => {
        dispatch(changeGetUsersForJointTrainingErrorState(false));
        dispatch(cleanTrainingError());
    };

    useLayoutEffect(() => {
        if (isCreateTrainingError && isCalendar) {
            CreateTrainingFail(clearErr);
        }
        if (isCreateTrainingError && !isCalendar) {
            UpdateTrainingFail();
        }

        if (isUpdateTrainingError) {
            UpdateTrainingFail();
        }

        if (isGetUsersForJoinTrainingError) {
            GetUsersFail(repeatRequest, clearErrorOfGetUsersForTraining);
        }
    }, [isCreateTrainingError, isUpdateTrainingError, isGetUsersForJoinTrainingError]);

    useLayoutEffect(() => {
        if (isGetTrainingListError) {
            GetTrainingsListFail(setStateOfRepeatRequest, clearErrOfGetTrainingsList);
        }
    }, [isGetTrainingListError]);

    useEffect(() => {
        if (isCreateTrainingSuccess || isUpdateTrainingSuccess) {
            dispatch(GetTrainingInfoThunk(accessToken));
        }
    }, [isCreateTrainingSuccess, isUpdateTrainingSuccess]);

    return (
        <div className='trainings-page'>
            <TrainingsHeader />
            <TrainingsWrapp />
            <CreateTrainingDrawer isDrawerOpen={isCreateTrainingDrawerOpen} />
            <JoinTrainingDrawer isDrawerOpen={isJoinTrainingDrawerOpen} />
            {isCreateTrainingSuccess && (
                <CreateTrainingSuccess title={CONSTANTS.CREATE_TRAINING_SUCCESS} />
            )}
            {isUpdateTrainingSuccess && (
                <CreateTrainingSuccess title={CONSTANTS.UPDATE_TRAINING_SUCCESS} />
            )}
            {isMyTrainingPartnerInfoModalOpen && <MyPartnerInfoModal />}
        </div>
    );
};
