import { useEffect, useState } from 'react';
import './AuthPage.scss';
import logo from '../../../public/assets/svg/logo.svg';
import { NavLink, Outlet } from 'react-router-dom';
import CONSTANTS from '@utils/constants';
import { Loader } from '@components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { IsAuthAction, LoginAction } from '@redux/actions/AuthActions';
import { ILoginResponse } from '../../types/apiTypes';

export const AuthPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const { isLoading } = useAppSelector((state) => state.isLoading);
    const { isAuth } = useAppSelector((state) => state.user);
    const router = useAppSelector((state) => state.router);
    const { isError } = useAppSelector((state) => state.error);
    const { requestError } = useAppSelector((state) => state.error);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            dispatch(LoginAction({ accessToken: token } as ILoginResponse));
            dispatch(IsAuthAction(true));
            dispatch(push('/main'));
        }
    }, []);

    useEffect(() => {
        if (isAuth) {
            dispatch(push('/main'));
        }
    }, [isAuth]);

    useEffect(() => {
        if (isError) {
            switch (requestError.statusCode) {
                case 401:
                    dispatch(
                        push(
                            `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.LOGIN__PATH}`,
                        ),
                    );
                    break;
                case 400:
                    dispatch(
                        push(
                            `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.ERROR__PATH}`,
                        ),
                    );
                    break;
                case 409:
                    dispatch(
                        push(
                            `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.USER_EXIT__PATH}`,
                        ),
                    );
                    break;
                case 429:
                    dispatch(
                        push(
                            `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.ERROR__PATH}`,
                        ),
                    );
                    break;
                case 500:
                    dispatch(
                        push(
                            `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.ERROR__PATH}`,
                        ),
                    );
                    break;

                default:
                    break;
            }
        }
    }, [isError]);

    return (
        <div className='auth-page'>
            <div className='auth__box'>
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
                <Outlet />
            </div>
            {isLoading && <Loader />}
        </div>
    );
};
