import { Button, Checkbox, Form, Input } from 'antd';

import './LoginForm.scss';
import CONSTANTS from '@utils/constants';
import { GooglePlusOutlined } from '@ant-design/icons';
import { IAuthRequest } from '../../types/apiTypes';
import { LoginUserThunk } from '@redux/thunk/userThunks';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CheckEmailThunk } from '@redux/thunk/changePasswordThunks';
import { push } from 'redux-first-history';
import { StatusCodes } from 'http-status-codes';

export const LoginForm = () => {
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [rememberUser, setRememberUser] = useState(false);
    const [email, setEmail] = useState('');
    const { isCheckEmailSuccess, isCheckEmailError, error } = useAppSelector(
        (state) => state.changePassword,
    );
    const { isAuth, isError: isErrorLogin, accessToken } = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isCheckEmailSuccess) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/confirm-email`));
        }
    }, [isCheckEmailSuccess]);

    useEffect(() => {
        if (isErrorLogin) {
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.LOGIN__PATH}`,
                ),
            );
        }
    }, [isErrorLogin]);

    useEffect(() => {
        if (
            isCheckEmailError &&
            error.statusCode === StatusCodes.NOT_FOUND &&
            error.message === CONSTANTS.CHECK_EMAIL_ERROR_MESSAGE
        ) {
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.CHECK_EMAIL_NO_EXIST__PATH}`,
                ),
            );
        } else if (isCheckEmailError && error.message !== CONSTANTS.CHECK_EMAIL_ERROR_MESSAGE) {
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.CHECK_EMAIL__PATH}`,
                ),
            );
        }
    }, [isCheckEmailError]);

    useEffect(() => {
        if (isAuth) {
            dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH));

            rememberUser && localStorage.setItem('jwtToken', accessToken as string);
        }
    }, [isAuth]);

    const loginUseGoogle = () => {
        window.location.href = `${CONSTANTS.URL}auth/google`;
    };

    const onClickForgotPassword = () => {
        isValidEmail && email ? dispatch(CheckEmailThunk({ email })) : null;
    };

    const onFinish = (values: IAuthRequest) => {
        if (isValidPassword && isValidEmail) {
            dispatch(
                LoginUserThunk({
                    email: values.email,
                    password: values.password,
                }),
            );
        }
    };

    const CheckEmail = (email: string) => {
        if (/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(email)) {
            setIsValidEmail(true);
            setEmail(email);
        } else {
            setIsValidEmail(false);
        }
    };

    const CheckPassword = (data: string) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data)) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
        }
    };

    return (
        <Form
            name='Login'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            className='form'
        >
            <Form.Item name='email' rules={[{ required: true }]}>
                <Input
                    addonBefore='email:'
                    data-test-id='login-email'
                    onChange={(e) => {
                        CheckEmail(e.target.value);
                    }}
                />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true }]}>
                <Input.Password
                    className='form__input'
                    placeholder='Пароль'
                    onChange={(e) => CheckPassword(e.target.value)}
                    data-test-id='login-password'
                />
            </Form.Item>

            <div className='form__items-box'>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox
                        className='form__item'
                        defaultChecked={rememberUser}
                        checked={rememberUser}
                        onClick={() => setRememberUser(!rememberUser)}
                        data-test-id='login-remember'
                    >
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Button
                    className='form__item login-forgot-button'
                    type='link'
                    data-test-id='login-forgot-button'
                    onClick={onClickForgotPassword}
                >
                    Забыли пароль?
                </Button>
            </div>

            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='form__button'
                    data-test-id='login-submit-button'
                >
                    Войти
                </Button>
            </Form.Item>
            <Button className='form__button' onClick={loginUseGoogle}>
                <GooglePlusOutlined className='form__button-icon' />
                Регистрация через Google
            </Button>
        </Form>
    );
};
