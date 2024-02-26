import { Result, Button } from 'antd';
import './RegistrationResult.scss';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useEffect } from 'react';
import { changeRegisterErrorState } from '@redux/slices/UserSlice';

export const RegistrationFailEmailWindow = () => {
    const dispatch = useAppDispatch();
    const { isRegisterError } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!isRegisterError) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`));
        }
    }, [isRegisterError]);

    return (
        <Result
            className='registration__res'
            status='error'
            title='Данные не сохранились
            '
            subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
            extra={[
                <Button
                    type='primary'
                    onClick={() => dispatch(changeRegisterErrorState(false))}
                    className='registration__res_btn'
                    data-test-id='registration-back-button'
                >
                    Назад к регистрации
                </Button>,
            ]}
        />
    );
};
