import { Result, Button } from 'antd';
import './RegistrationResult.scss';
import CONSTANTS from '@utils/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';

export const RegistrationSuccessWindow = () => {
    const dispatch = useAppDispatch();

    return (
        <Result
            className='registration__res'
            status='success'
            title='Регистрация успешна'
            subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
            extra={[
                <Button
                    type='primary'
                    onClick={() => dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`))}
                    className='registration__res_btn'
                    data-test-id='registration-enter-button'
                >
                    Войти
                </Button>,
            ]}
        />
    );
};
