import { Button, Modal, Result } from 'antd';

import './FeedbacksResult.scss';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { AppContext } from '../../context/AppContext';

export const CreateFeedbackSuccessModal = ({
    isCreateFeedbackSuccessModalOpen,
}: {
    isCreateFeedbackSuccessModalOpen: boolean;
}) => {
    const { closeModal } = useContext(AppContext);

    const onOk = () => {
        closeModal(CONSTANTS.CREATE_FEEDBACK_SUCCESS_MODAL);
    };

    return (
        <Modal
            open={isCreateFeedbackSuccessModalOpen}
            onCancel={() => closeModal(CONSTANTS.CREATE_FEEDBACK_MODAL)}
            className='create-feedback modal-component'
            closeIcon={null}
            footer={null}
        >
            <Result
                status='success'
                title='Отзыв успешно опубликован'
                className='result-component'
                extra={[
                    <Button type='primary' onClick={onOk} className='button'>
                        Отлично
                    </Button>,
                ]}
            />
        </Modal>
    );
};
