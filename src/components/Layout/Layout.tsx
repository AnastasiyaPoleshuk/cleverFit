import { GetRequestFail } from '@components/ErrorModals/GetRequestFail';
import { Loader } from '@components/Loader/Loader';
import { Navigation } from '@components/Navigation/Navigation';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { changeAuthState, setToken } from '@redux/slices/UserSlice';
import { push } from 'redux-first-history';
import CONSTANTS from '@utils/constants';
import { changeGetFeedbacksErrorState } from '@redux/slices/FeedbacksSlice';
import { changeGetTrainingInfoErrorState } from '@redux/slices/CalendarSlice';
import { CreateFeedbackModal } from '@components/CreateFeedbackModal/CreateFeedbackModal';
import { CreateFeedbackFailModal } from '@components/FeedbacksResult/CreateFeedbackFailModal';
import { CreateFeedbackSuccessModal } from '@components/FeedbacksResult/CreateFeedbackSuccessModal';

export const Layout = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const { isLoading: isLoadingUser } = useAppSelector((state) => state.user);
    const { isLoading: isLoadingChangePassword } = useAppSelector((state) => state.changePassword);
    const { isLoading: isLoadingFeedback } = useAppSelector((state) => state.feedbacks);
    const { isLoading: isLoadingTrainingInfo, isGetTrainingInfoError } = useAppSelector(
        (state) => state.calendar,
    );
    const {
        isFeedbacksFailModalOpen,
        isCreateFeedbackModalOpen,
        isCreateFeedbackSuccessModalOpen,
        isCreateFeedbackErrorModalOpen,
    } = useContext(AppContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (queryParams.get('accessToken')) {
            localStorage.setItem('jwtToken', queryParams.get('accessToken') as string);
            dispatch(changeAuthState(true));
            dispatch(setToken(queryParams.get('accessToken') as string));
            dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH));
        }
    }, []);

    return (
        <div className='app'>
            <Navigation />
            <Outlet />
            {(isLoadingUser ||
                isLoadingChangePassword ||
                isLoadingFeedback ||
                isLoadingTrainingInfo) && <Loader />}
            <GetRequestFail
                isOpen={isFeedbacksFailModalOpen}
                changeErrorState={changeGetFeedbacksErrorState}
            />
            <GetRequestFail
                isOpen={isGetTrainingInfoError}
                changeErrorState={changeGetTrainingInfoErrorState}
            />
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
