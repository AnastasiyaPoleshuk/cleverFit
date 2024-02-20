import { Result, Button } from 'antd';
import './RegistrationResult.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import CONSTANTS from '@utils/constants';
import { isErrorAction } from '@redux/actions/ErrorAction';
import { useEffect } from 'react';

export const RegistrationFailWindow = () => {
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
            title='Данные не сохранились'
            subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
            extra={[
                <Button
                    type='primary'
                    onClick={() => dispatch(isErrorAction(false))}
                    className='registration__res_btn'
                    data-test-id='registration-retry-button'
                >
                    Повторить
                </Button>,
            ]}
        />
    );
};
