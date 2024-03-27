import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import './FeedBackPage.scss';
import { NoFeedbacksBlok } from '@components/NoFeedbacksBlok/NoFeedbacksBlok';
import { FeedbacksWrapp } from '@components/FeedbacksWrapp/FeedbacksWrapp';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { CreateFeedbackModal } from '@components/CreateFeedbackModal/CreateFeedbackModal';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';
import { GetFeedbacksThunk } from '@redux/thunk/feedbacksThunk';
import { CreateFeedbackSuccessModal } from '@components/FeedbacksResult/CreateFeedbackSuccessModal';
import {
    changeGetFeedbacksErrorState,
    changeGetFeedbacksSuccessState,
    cleanError,
} from '@redux/slices/FeedbacksSlice';
import { setToken, changeAuthState } from '@redux/slices/UserSlice';
import { StatusCodes } from 'http-status-codes';
import { CreateFeedbackFailModal } from '@components/FeedbacksResult/CreateFeedbackFailModal';
import { Header } from '@components/header/Header';

export const FeedBackPage = () => {
    const {
        feedbacks,
        isCreateFeedbackError,
        isCreateFeedbackSuccess,
        isGetFeedbacksError,
        error,
        isLoading,
    } = useAppSelector((state) => state.feedbacks);
    const { isAuth, accessToken } = useAppSelector((state) => state.user);
    const { openModal } = useContext(AppContext);
    const [isFeedbacks, setIsFeedbacks] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setIsFeedbacks(!!feedbacks.length);
        }
    }, [isLoading]);

    useEffect(() => {
        if (isGetFeedbacksError && error.statusCode === StatusCodes.FORBIDDEN) {
            dispatch(setToken(''));
            dispatch(changeAuthState(false));
            localStorage.removeItem('jwtToken');
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
            changeGetFeedbacksErrorState(false);
            dispatch(cleanError());
        } else if (isGetFeedbacksError) {
            openModal(CONSTANTS.GET_FEEDBACKS_FAIL_MODAL);
        }
    }, [isGetFeedbacksError]);

    useEffect(() => {
        if (isCreateFeedbackError) {
            openModal(CONSTANTS.CREATE_FEEDBACK_ERROR_MODAL);
        }
    }, [isCreateFeedbackError]);

    useEffect(() => {
        if (isCreateFeedbackSuccess) {
            dispatch(changeGetFeedbacksSuccessState(false));
            dispatch(GetFeedbacksThunk(accessToken));
            openModal(CONSTANTS.CREATE_FEEDBACK_SUCCESS_MODAL);
        }
    }, [isCreateFeedbackSuccess]);

    return (
        <div className={`feedback ${isFeedbacks ? 'feedbacks__wrapp' : 'no-feedbacks'}`}>
            <Header />
            {isFeedbacks ? <FeedbacksWrapp /> : <NoFeedbacksBlok />}
        </div>
    );
};
