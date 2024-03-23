import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages';

import './App.scss';
import { Layout } from '@components/Layout/Layout';
import CONSTANTS from '@utils/constants';
import { AuthPage } from '@pages/AuthPage/AuthPage';
import { ResultPage } from '@pages/ResultPage/ResultPage';
import { LoginForm } from '@components/LoginForm/LoginForm';
import { RegistrationForm } from '@components/RegistrationForm/RegistrationForm';
import { LoginFailWindow } from '@components/LoginFailWindow/LoginFailWindow';
import { RegistrationFailWindow } from '@components/RegistrationResult/RegistrationFailWindow';
import { RegistrationFailEmailWindow } from '@components/RegistrationResult/RegistrationFailEmailWindow';
import { RegistrationSuccessWindow } from '@components/RegistrationResult/RegistrationSuccessWindow';
import { ConfirmEmailForm } from '@components/ConfirmEmailForm/ConfirmEmailForm';
import { ChangePasswordForm } from '@components/ChangePasswordForm/ChangePasswordForm';
import { CheckEmailFail } from '@components/CheckPasswordResult/CheckEmailFail';
import { CheckEmailError } from '@components/CheckPasswordResult/CheckEmailError';
import { ChangePasswordFail } from '@components/CheckPasswordResult/ChangePasswordFail';
import { ChangePasswordSuccess } from '@components/CheckPasswordResult/ChangePasswordSuccess';
import { FeedBackPage } from '@pages/FeedBackPage/FeedBackPage';
import { CalendarPage } from '@pages/CalendarPage/CalendarPage';
import { ProfilePage } from '@pages/ProfilePage/ProfilePage';

export const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<Navigate to={CONSTANTS.ROUTER__PATH.MAIN__PATH} />} />
                <Route path={CONSTANTS.ROUTER__PATH.MAIN__PATH} element={<MainPage />} />
                <Route path={CONSTANTS.ROUTER__PATH.FEEDBACKS__PATH} element={<FeedBackPage />} />
                <Route path={CONSTANTS.ROUTER__PATH.CALENDAR__PATH} element={<CalendarPage />} />
                <Route path={CONSTANTS.ROUTER__PATH.PROFILE__PATH} element={<ProfilePage />} />
            </Route>
            <Route path={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`} element={<AuthPage />}>
                <Route index element={<LoginForm />} />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`}
                    element={<RegistrationForm />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/confirm-email`}
                    element={<ConfirmEmailForm />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}${CONSTANTS.ROUTER__PATH.CHANGE_PASSWORD__PATH}`}
                    element={<ChangePasswordForm />}
                />
            </Route>

            <Route path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}`} element={<ResultPage />}>
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.LOGIN__PATH}`}
                    element={<LoginFailWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.SUCCESS.SUCCESS__PATH}`}
                    element={<RegistrationSuccessWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.LOGIN__PATH}`}
                    element={<LoginFailWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.USER_EXIT__PATH}`}
                    element={<RegistrationFailEmailWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.ERROR__PATH}`}
                    element={<RegistrationFailWindow />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.CHECK_EMAIL_NO_EXIST__PATH}`}
                    element={<CheckEmailFail />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.CHECK_EMAIL__PATH}`}
                    element={<CheckEmailError />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.CHANGE_PASSWORD__PATH}`}
                    element={<ChangePasswordFail />}
                />
                <Route
                    path={`${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.SUCCESS.CHANGE_PASSWORD__PATH}`}
                    element={<ChangePasswordSuccess />}
                />
            </Route>
        </Routes>
    );
};
