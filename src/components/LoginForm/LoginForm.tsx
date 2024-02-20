import { Button, Checkbox, Form, Input } from 'antd';

import './LoginForm.scss';
import CONSTANTS from '@utils/constants';
import { GooglePlusOutlined } from '@ant-design/icons';
import { IAuthRequest } from '../../types/apiTypes';
import { LoginUserThunk } from '@redux/thunks/LoginUserThunk';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { HealthMonitorThunk } from '@redux/thunks/HealthMonitorThunk';
import { CheckEmailThunk } from '@redux/thunks/CheckEmailThunk';
import { push } from 'redux-first-history';
export const LoginForm = () => {
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [rememberUser, setRememberUser] = useState(false);
    const [email, setEmail] = useState('');
    const { token } = useAppSelector((state) => state.user);
    const { isAuth } = useAppSelector((state) => state.user);
    const { isCheckEmailSuccess } = useAppSelector((state) => state.user);
    const { isHealth } = useAppSelector((state) => state.isHealth);
    const { isError } = useAppSelector((state) => state.error);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isCheckEmailSuccess) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/confirm-email`));
        }

        if (!isCheckEmailSuccess && isError) {
            //! dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/confirm-email`));
        }
    }, [isCheckEmailSuccess]);

    useEffect(() => {
        if (isAuth && rememberUser) {
            localStorage.setItem('jwtToken', token as string);
        }
    }, [isAuth]);

    useEffect(() => {
        if (isHealth) {
            dispatch(CheckEmailThunk({ email }));
        }
    }, [isHealth]);

    const onClickForgotPassword = () => {
        dispatch(HealthMonitorThunk());
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

        setRememberUser(values.remember as boolean);
    };

    const CheckEmail = (email: string) => {
        if (/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(email)) {
            setIsValidEmail(true);
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
                    onBlur={(e) => {
                        setEmail(e.target.value);
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
                    <Checkbox className='form__item' data-test-id='login-remember'>
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Button
                    className='form__item'
                    type='link'
                    data-test-id='login-forgot-button'
                    disabled={isValidEmail ? false : true}
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
            <Button className='form__button'>
                <GooglePlusOutlined />
                Регистрация через Google
            </Button>
        </Form>
    );
};
