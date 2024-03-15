import { Button, Input, Modal, Rate } from 'antd';

import './CreateFeedbackModal.scss';
import { useContext, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { AppContext } from '../../context/AppContext';
import { useAppDispatch } from '@hooks/index';
import { CreateFeedbacksThunk } from '@redux/thunk/feedbacksThunk';
import { StarFilled, StarOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const CreateFeedbackModal = ({
    isCreateFeedbackModalOpen,
}: {
    isCreateFeedbackModalOpen: boolean;
}) => {
    const [rating, setRating] = useState(CONSTANTS.RATE_DEFAULT_VALUE);
    const [message, setMessage] = useState('');
    const { closeModal } = useContext(AppContext);
    const dispatch = useAppDispatch();

    const onOk = () => {
        dispatch(CreateFeedbacksThunk({ message, rating }));
        closeModal(CONSTANTS.CREATE_FEEDBACK_MODAL);
    };

    return (
        <Modal
            title='Ваш отзыв'
            open={isCreateFeedbackModalOpen}
            onCancel={() => closeModal(CONSTANTS.CREATE_FEEDBACK_MODAL)}
            styles={{
                mask: {
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(121, 156, 212, 0.2)',
                },
            }}
            footer={
                <Button
                    type='primary'
                    className='create-feedback__btn'
                    onClick={onOk}
                    data-test-id='new-review-submit-button'
                >
                    Опубликовать
                </Button>
            }
            className='create-feedback'
        >
            <div className='create-feedback__modal-content'>
                <Rate
                    className='create-feedback__rate'
                    character={({ value, index }) => {
                        return value && index < value ? <StarFilled /> : <StarOutlined />;
                    }}
                    defaultValue={CONSTANTS.RATE_DEFAULT_VALUE}
                    onChange={(value) => setRating(value)}
                />
                <TextArea autoSize={{ minRows: 2 }} onChange={(e) => setMessage(e.target.value)} />
            </div>
        </Modal>
    );
};
