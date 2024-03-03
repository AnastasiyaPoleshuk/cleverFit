import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import './FeedBackPage.scss';
import { NoFeedbacksBlok } from '@components/NoFeedbacksBlok/NoFeedbacksBlok';
import { FeedbacksWrapp } from '@components/FeedbacksWrapp/FeedbacksWrapp';
import { FeedbacksHeader } from '@components/FeedbacksHeader/FeedbacksHeader';
import { useContext, useEffect } from 'react';
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

export const FeedBackPage = () => {
    const {
        feedbacks,
        isCreateFeedbackError,
        isCreateFeedbackSuccess,
        isGetFeedbacksError,
        error,
    } = useAppSelector((state) => state.feedbacks);
    const { isAuth, accessToken } = useAppSelector((state) => state.user);
    const {
        isCreateFeedbackModalOpen,
        isCreateFeedbackSuccessModalOpen,
        isCreateFeedbackErrorModalOpen,
        openModal,
    } = useContext(AppContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

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
        <div className={`feedback ${!feedbacks.length ? 'feedbacks__wrapp' : 'no-feedbacks'}`}>
            <FeedbacksHeader />
            {feedbacks.length ? <FeedbacksWrapp /> : <NoFeedbacksBlok />}
            <CreateFeedbackModal isCreateFeedbackModalOpen={isCreateFeedbackModalOpen} />
            <CreateFeedbackSuccessModal
                isCreateFeedbackSuccessModalOpen={isCreateFeedbackSuccessModalOpen}
            />
            <CreateFeedbackFailModal
                isCreateFeedbackErrorModalOpen={isCreateFeedbackErrorModalOpen}
            />
        </div>
    );
};
