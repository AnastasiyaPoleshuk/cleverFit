import { Button } from 'antd';
import './NoFeedbacksBlok.scss';
import CONSTANTS from '@utils/constants';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export const NoFeedbacksBlok = () => {
    const { openModal } = useContext(AppContext);

    return (
        <section className='no-feedbacks'>
            <div className='no-feedbacks__card'>
                <h2 className='no-feedbacks__card-title'>Оставьте свой отзыв первым</h2>
                <p className='no-feedbacks__card-subtitle'>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. <br />
                    Поделитесь своим мнением и опытом с другими пользователями, <br /> и помогите им
                    сделать правильный выбор.
                </p>
            </div>
            <Button
                type='primary'
                className='no-feedbacks__btn'
                onClick={() => openModal(CONSTANTS.CREATE_FEEDBACK_MODAL)}
                data-test-id='write-review'
            >
                Написать отзыв
            </Button>
        </section>
    );
};
