import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
import './CheckPasswordResult.scss';
import { useEffect } from 'react';
import { changePasswordErrorState } from '../../redux/slices/ChangePasswordSlice';
import { routerSelector } from '@utils/StoreSelectors';

export const ChangePasswordFail = () => {
    const router = useAppSelector(routerSelector);
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

    const retryRequest = () => {
        dispatch(changePasswordErrorState(false));
        dispatch(
            push(
                `${CONSTANTS.ROUTER__PATH.AUTH__PATH}${CONSTANTS.ROUTER__PATH.CHANGE_PASSWORD__PATH}`,
            ),
        );
    };

    return (
        <Result
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте ещё раз'
            extra={
                <Button
                    type='primary'
                    className='result__btn'
                    data-test-id='change-retry-button'
                    onClick={retryRequest}
                >
                    Повторить
                </Button>
            }
        />
    );
};
