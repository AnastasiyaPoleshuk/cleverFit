import { Breadcrumb, Button } from 'antd';
import './FeedbacksHeader.scss';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';

export const FeedbacksHeader = () => {
    const dispatch = useAppDispatch();

    return (
        <header className='feedbacks__header'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Button
                        type='link'
                        onClick={() => dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`))}
                        className='feedbacks__header-btn'
                    >
                        Главная
                    </Button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Отзывы пользователей</Breadcrumb.Item>
            </Breadcrumb>
        </header>
    );
};
