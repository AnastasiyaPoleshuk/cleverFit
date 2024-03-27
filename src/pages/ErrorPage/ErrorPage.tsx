import { Result, Button } from 'antd';
import './ErrorPage.scss';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import CONSTANTS from '@utils/constants';

export const ErrorPage = () => {
    const dispatch = useAppDispatch();
    return (
        <div className='error-page'>
            <div className='error-page__content'>
                <Result
                    status='404'
                    title='Такой страницы нет'
                    subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                    extra={
                        <Button
                            type='primary'
                            onClick={() => dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH))}
                        >
                            На главную
                        </Button>
                    }
                />
            </div>
        </div>
    );
};
