import { Button, Form, Input } from 'antd';
import './RegistrationForm.scss';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { RegisterUserThunk } from '../../redux/thunk/userThunks';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';

interface IRegistrationData {
    email: string;
    password: string;
    passwordRepeat: string;
}

export const RegistrationForm = () => {
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isPasswordsMatch, setIsVPasswordsMatch] = useState(true);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const [password, setPassword] = useState('');
    const [registrationData, setRegistrationData] = useState({ email: '', password: '' });
    const { isRegisterSuccess } = useAppSelector((state) => state.user);
    const router = useAppSelector((state) => state.router);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const previousLocation = router.previousLocations
            ? router.previousLocations[1].location?.pathname
            : undefined;

        if (
            previousLocation ===
            `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.ERROR__PATH}`
        ) {
            dispatch(
                RegisterUserThunk({
                    email: registrationData.email,
                    password: registrationData.password,
                }),
            );
        }
    }, []);

    useEffect(() => {
        if (isRegisterSuccess) {
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.SUCCESS.SUCCESS__PATH}`,
                ),
            );
        }
    }, [isRegisterSuccess]);

    const onFinish = (registrationData: IRegistrationData) => {
        if (isPasswordsMatch) {
            setRegistrationData(registrationData);
            dispatch(
                RegisterUserThunk({
                    email: registrationData.email,
                    password: registrationData.password,
                }),
            );
        }
    };

    const onFinishFailed = () => {
        setSubmitButtonDisabled(true);
    };

    const CheckEmail = (data: string) => {
        if (/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(data)) {
            setIsValidEmail(true);
            setSubmitButtonDisabled(false);
        } else {
            setIsValidEmail(false);
            setSubmitButtonDisabled(true);
        }
    };

    const CheckPassword = (data: string) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data)) {
            setIsValidPassword(true);
            setSubmitButtonDisabled(false);
        } else {
            setIsValidPassword(false);
            setSubmitButtonDisabled(true);
        }
        setIsVPasswordsMatch(false);
        setPassword(data);
    };

    const CheckPasswordsMatch = (repeatedPassword: string) => {
        if (repeatedPassword === password) {
            setSubmitButtonDisabled(false);
            setIsVPasswordsMatch(true);
        } else {
            setSubmitButtonDisabled(true);
            setIsVPasswordsMatch(false);
        }
    };

    return (
        <Form
            name='Registration'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className='form'
        >
            <Form.Item
                name='email'
                rules={[{ required: true }]}
                validateStatus={isValidEmail ? 'success' : 'error'}
            >
                <Input
                    addonBefore='email:'
                    data-test-id='registration-email'
                    onChange={(e) => CheckEmail(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
                validateStatus={isValidPassword ? 'success' : 'error'}
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
            >
                <Input.Password
                    className='form__input'
                    placeholder='Пароль'
                    onChange={(e) => CheckPassword(e.target.value)}
                    data-test-id='registration-password'
                />
            </Form.Item>

            <Form.Item
                name='passwordRepeat'
                rules={[{ required: true }]}
                validateStatus={isPasswordsMatch ? 'success' : 'error'}
                help={isPasswordsMatch ? '' : 'Пароли не совпадают'}
            >
                <Input.Password
                    className='form__input'
                    placeholder='Пароль'
                    onChange={(e) => CheckPasswordsMatch(e.target.value)}
                    data-test-id='registration-confirm-password'
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='form__button'
                    disabled={submitButtonDisabled}
                    data-test-id='registration-submit-button'
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
