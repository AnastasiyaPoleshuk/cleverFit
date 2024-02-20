import { Result, Button } from 'antd';
import './RegistrationResult.scss';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isErrorAction } from '@redux/actions/ErrorAction';
import { useEffect } from 'react';

export const RegistrationFailEmailWindow = () => {
    const dispatch = useAppDispatch();
    const { isError } = useAppSelector((state) => state.error);

    useEffect(() => {
        if (!isError) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`));
        }
    }, [isError]);

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
                    onClick={() => dispatch(isErrorAction(false))}
                    className='registration__res_btn'
                    data-test-id='registration-back-button'
                >
                    Назад к регистрации
                </Button>,
            ]}
        />
    );
};
