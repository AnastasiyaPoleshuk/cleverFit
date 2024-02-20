import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { Button, Result } from 'antd';
import { push } from 'redux-first-history';

export const CheckPasswordSuccess = () => {
    const dispatch = useAppDispatch();

    return (
        <Result
            status='success'
            title='Пароль успешно изменен'
            subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
            extra={
                <Button
                    type='primary'
                    data-test-id='change-entry-button'
                    onClick={() => dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`))}
                >
                    Вход
                </Button>
            }
        />
    );
};
