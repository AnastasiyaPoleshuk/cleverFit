import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { Button, Modal, Result } from 'antd';
import { push } from 'redux-first-history';
import './FeedbacksResult.scss';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { changeGetFeedbacksErrorState } from '@redux/slices/FeedbacksSlice';

export const GetFeedbacksFail = ({
    isFeedbacksFailModalOpen,
}: {
    isFeedbacksFailModalOpen: boolean;
}) => {
    const { closeModal } = useContext(AppContext);
    const dispatch = useAppDispatch();

    const close = () => {
        dispatch(changeGetFeedbacksErrorState(false));
        dispatch(push(`${CONSTANTS.ROUTER__PATH.MAIN__PATH}`));

        closeModal(CONSTANTS.GET_FEEDBACKS_FAIL_MODAL);
    };

    return (
        <Modal
            open={isFeedbacksFailModalOpen}
            onCancel={() => closeModal(CONSTANTS.CREATE_FEEDBACK_MODAL)}
            className='modal-component'
            closeIcon={null}
            footer={null}
        >
            <Result
                status={CONSTANTS.RESULT_STATUS_TYPE_500}
                title='Что-то пошло не так'
                subTitle={'Произошла ошибка, попробуйте ещё раз.'}
                extra={
                    <Button type='primary' className='result-fail-button' onClick={close}>
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};
