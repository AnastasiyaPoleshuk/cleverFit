import { Button, Modal, Result } from 'antd';

import './FeedbacksResult.scss';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { AppContext } from '../../context/AppContext';
import { useAppDispatch } from '@hooks/index';
import { changeCreateFeedbackErrorState, cleanError } from '@redux/slices/FeedbacksSlice';

export const CreateFeedbackFailModal = ({
    isCreateFeedbackErrorModalOpen,
}: {
    isCreateFeedbackErrorModalOpen: boolean;
}) => {
    const { closeModal, openModal } = useContext(AppContext);
    const dispatch = useAppDispatch();

    const onOk = () => {
        openModal(CONSTANTS.CREATE_FEEDBACK_MODAL);
        dispatch(changeCreateFeedbackErrorState(false));
        dispatch(cleanError());
        closeModal(CONSTANTS.CREATE_FEEDBACK_ERROR_MODAL);
    };

    const cancel = () => {
        closeModal(CONSTANTS.CREATE_FEEDBACK_ERROR_MODAL);
        dispatch(changeCreateFeedbackErrorState(false));
        dispatch(cleanError());
    };

    return (
        <Modal
            open={isCreateFeedbackErrorModalOpen}
            className='create-feedback modal-component'
            closeIcon={null}
            footer={null}
        >
            <Result
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                className='result-component'
                extra={[
                    <div className='result-buttons'>
                        <Button
                            type='primary'
                            onClick={onOk}
                            className='button'
                            data-test-id='write-review-not-saved-modal'
                        >
                            Написать отзыв
                        </Button>
                        <Button onClick={cancel} className='button'>
                            Закрыть
                        </Button>
                    </div>,
                ]}
            />
        </Modal>
    );
};
