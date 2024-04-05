import { useEffect, useState } from 'react';
import './AuthPage.scss';
import logo from '../../../public/assets/svg/logo.svg';
import { NavLink, Outlet } from 'react-router-dom';
import CONSTANTS from '@utils/constants';
import { Loader } from '@components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { StatusCodes } from 'http-status-codes';
import { changeAuthState, setToken } from '@redux/slices/UserSlice';
import { UserSelector, routerSelector } from '@utils/StoreSelectors';

export const AuthPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const { isAuth, isRegisterError, error, isLoading } = useAppSelector(UserSelector);
    const router = useAppSelector(routerSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (router.location?.pathname === CONSTANTS.ROUTER__PATH.AUTH__PATH) {
            setIsLoginForm(true);
        } else {
            setIsLoginForm(false);
        }

        const token = localStorage.getItem('jwtToken');
        if (token) {
            dispatch(setToken(token));
            dispatch(changeAuthState(true));
            dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH));
        }
    }, []);

    useEffect(() => {
        if (isAuth) {
            dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH));
        }
    }, [isAuth]);

    useEffect(() => {
        if (
            isRegisterError &&
            error.statusCode === StatusCodes.CONFLICT &&
            router.location?.pathname === `${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`
        ) {
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.USER_EXIT__PATH}`,
                ),
            );
        } else if (
            isRegisterError &&
            router.location?.pathname === `${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`
        ) {
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.ERROR__PATH}`,
                ),
            );
        }
    }, [isRegisterError]);

    return (
        <div className='auth-page'>
            <div className='auth__box'>
                {(router.location?.pathname === '/auth' ||
                    router.location?.pathname === '/auth/registration') && (
                    <>
                        <img src={logo} alt='logo' className='auth__logo' />
                        <div className='auth__btn-box'>
                            <NavLink
                                to={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`}
                                className={`auth__btn ${isLoginForm ? ' auth__btn-active' : ''}`}
                                onClick={() => setIsLoginForm(true)}
                            >
                                Вход
                            </NavLink>
                            <NavLink
                                to={`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`}
                                className={`auth__btn ${!isLoginForm ? ' auth__btn-active' : ''}`}
                                onClick={() => setIsLoginForm(false)}
                            >
                                Регистрация
                            </NavLink>
                        </div>
                    </>
                )}

                <Outlet />
            </div>
            {isLoading && <Loader />}
        </div>
    );
};
