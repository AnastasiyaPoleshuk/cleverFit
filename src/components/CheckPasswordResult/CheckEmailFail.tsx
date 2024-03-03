import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
import './CheckPasswordResult.scss';
import { useEffect } from 'react';
import { checkEmailErrorState } from '@redux/slices/ChangePasswordSlice';

export const CheckEmailFail = () => {
    const router = useAppSelector((state) => state.router);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const previousLocation = router.previousLocations
            ? router.previousLocations[1].location?.pathname
            : undefined;
        if (previousLocation !== CONSTANTS.ROUTER__PATH.AUTH__PATH) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    const retry = () => {
        dispatch(checkEmailErrorState(false));
        dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
    };

    return (
        <Result
            status='error'
            title='Такой e-mail не зарегистрирован'
            subTitle={
                <span>
                    Мы не нашли в базе вашего e-mail. Попробуйте <br /> войти с другим e-mail.
                </span>
            }
            extra={
                <Button
                    type='primary'
                    data-test-id='check-retry-button'
                    className='result__btn check-retry-button'
                    onClick={retry}
                >
                    Попробовать снова
                </Button>
            }
        />
    );
};
