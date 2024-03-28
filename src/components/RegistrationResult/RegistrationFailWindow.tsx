import { Result, Button } from 'antd';
import './RegistrationResult.scss';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import CONSTANTS from '@utils/constants';
import { useContext } from 'react';
import { RegisterUserThunk } from '@redux/thunk/userThunks';
import { AppContext } from '../../context/AppContext';

export const RegistrationFailWindow = () => {
    const { registrationData } = useContext(AppContext);

    const dispatch = useAppDispatch();

    const retryRequest = () => {
        dispatch(
            RegisterUserThunk({
                email: registrationData.email,
                password: registrationData.password,
            }),
        );
        dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}/registration`));
    };

    return (
        <Result
            className='registration__res'
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
            extra={[
                <Button
                    type='primary'
                    onClick={retryRequest}
                    className='registration__res_btn'
                    data-test-id='registration-retry-button'
                >
                    Повторить
                </Button>,
            ]}
        />
    );
};
