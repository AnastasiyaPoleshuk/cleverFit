import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
import './CheckPasswordResult.scss';
import { useEffect } from 'react';
import {
    changePasswordErrorState,
    checkEmailSuccessState,
} from '../../redux/slices/ChangePasswordSlice';

export const ChangePasswordSuccess = () => {
    const router = useAppSelector((state) => state.router);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const previousLocation = router.previousLocations
            ? router.previousLocations[1].location?.pathname
            : undefined;

        if (
            previousLocation !==
            `${CONSTANTS.ROUTER__PATH.AUTH__PATH}${CONSTANTS.ROUTER__PATH.CHANGE_PASSWORD__PATH}`
        ) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    const redirect = () => {
        dispatch(checkEmailSuccessState(false));
        dispatch(changePasswordErrorState(false));
        dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
    };

    return (
        <Result
            status='success'
            title='Пароль успешно изменен'
            subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
            extra={
                <Button
                    type='primary'
                    data-test-id='change-entry-button'
                    className='result__btn'
                    onClick={redirect}
                >
                    Вход
                </Button>
            }
        />
    );
};
