import { Result, Button } from 'antd';
import './RegistrationResult.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import CONSTANTS from '@utils/constants';
import { useEffect } from 'react';
import { changeRegisterErrorState } from '@redux/slices/UserSlice';

export const RegistrationFailWindow = () => {
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
            title='Данные не сохранились'
            subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
            extra={[
                <Button
                    type='primary'
                    onClick={() => dispatch(changeRegisterErrorState(false))}
                    className='registration__res_btn'
                    data-test-id='registration-retry-button'
                >
                    Повторить
                </Button>,
            ]}
        />
    );
};
