import { Form, Input, Button } from 'antd';
import './ChangePasswordForm.scss';
import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useEffect, useState } from 'react';
import { IChangePasswordRequest } from '../../types/apiTypes';
import { ChangePasswordThunk } from '@redux/thunk/changePasswordThunks';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';

export const ChangePasswordForm = () => {
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isPasswordsMatch, setIsVPasswordsMatch] = useState(true);
    const [changePassword, setChangePassword] = useState({ password: '', confirmPassword: '' });
    const [password, setPassword] = useState('');
    const { isChangePasswordSuccess, isChangePasswordError } = useAppSelector(
        (state) => state.changePassword,
    );
    const router = useAppSelector((state) => state.router);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const previousLocation = router.previousLocations
            ? router.previousLocations[1].location?.pathname
            : undefined;
        if (
            previousLocation ===
            `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.CHANGE_PASSWORD__PATH}`
        ) {
            dispatch(ChangePasswordThunk(changePassword));
        } else if (previousLocation !== `${CONSTANTS.ROUTER__PATH.AUTH__PATH}/confirm-email`) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    useEffect(() => {
        if (isChangePasswordSuccess) {
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.SUCCESS.CHANGE_PASSWORD__PATH}`,
                ),
            );
        }
        if (isChangePasswordError) {
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.RESULT.RESULT}${CONSTANTS.ROUTER__PATH.RESULT.ERROR.CHANGE_PASSWORD__PATH}`,
                ),
            );
        }
    }, [isChangePasswordSuccess, isChangePasswordError]);

    const onFinish = (passwordData: IChangePasswordRequest) => {
        if (isPasswordsMatch) {
            dispatch(ChangePasswordThunk(passwordData));
            setChangePassword(passwordData);
        }
    };

    const CheckPassword = (password: string) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
        }
        setIsVPasswordsMatch(false);
        setPassword(password);
    };

    const CheckPasswordsMatch = (confirmPassword: string) => {
        if (confirmPassword === password) {
            setIsVPasswordsMatch(true);
        } else {
            setIsVPasswordsMatch(false);
        }
    };

    return (
        <div className='change-password'>
            <h2 className='change-password__title'>Восстановление аккауанта</h2>

            <Form name='reset-Password' onFinish={onFinish} autoComplete='off' className='form'>
                <Form.Item
                    name='password'
                    rules={[{ required: true }]}
                    validateStatus={isValidPassword ? 'success' : 'error'}
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                >
                    <Input.Password
                        className='form__input'
                        placeholder='Пароль'
                        onChange={(e) => CheckPassword(e.target.value)}
                        data-test-id='change-password'
                    />
                </Form.Item>

                <Form.Item
                    name='confirmPassword'
                    rules={[{ required: true }]}
                    validateStatus={isPasswordsMatch ? 'success' : 'error'}
                    help={isPasswordsMatch ? '' : 'Пароли не совпадают'}
                >
                    <Input.Password
                        className='form__input'
                        placeholder='Пароль'
                        onChange={(e) => CheckPasswordsMatch(e.target.value)}
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='form__button'
                        data-test-id='change-submit-button'
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
