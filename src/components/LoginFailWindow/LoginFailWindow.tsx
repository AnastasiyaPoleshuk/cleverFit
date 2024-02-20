import { Button, Result } from 'antd';
import './LoginFailWindow.scss';
import CONSTANTS from '@utils/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { isErrorAction } from '@redux/actions/ErrorAction';
import { useEffect } from 'react';

export const LoginFailWindow = () => {
    const dispatch = useAppDispatch();
    const { isError } = useAppSelector((state) => state.error);

    useEffect(() => {
        if (!isError) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, [isError]);

    return (
        <Result
            className='loginFail__res'
            status='warning'
            title='Вход не выполнен'
            subTitle='Что-то пошло не так. Попробуйте еще раз'
            extra={
                <Button
                    type='primary'
                    onClick={() => dispatch(isErrorAction(false))}
                    className='loginFail__res_btn'
                    data-test-id='login-retry-button'
                >
                    Повторить
                </Button>
            }
        />
    );
};
