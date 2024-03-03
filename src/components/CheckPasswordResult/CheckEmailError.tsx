import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { checkEmailErrorState } from '@redux/slices/ChangePasswordSlice';
import { CheckEmailThunk } from '@redux/thunk/changePasswordThunks';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { useEffect } from 'react';
import { push } from 'redux-first-history';

export const CheckEmailError = () => {
    const { email } = useAppSelector((state) => state.changePassword);
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

    const back = () => {
        dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        dispatch(checkEmailErrorState(false));
        dispatch(CheckEmailThunk({ email }));
    };

    return (
        <Result
            status={CONSTANTS.RESULT_STATUS_TYPE_500}
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
            extra={
                <Button
                    type='primary'
                    data-test-id='check-back-button'
                    className='result__btn'
                    onClick={back}
                >
                    Назад
                </Button>
            }
        />
    );
};
