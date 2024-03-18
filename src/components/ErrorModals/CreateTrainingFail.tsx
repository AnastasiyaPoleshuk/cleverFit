import { CloseCircleOutlined } from '@ant-design/icons';
import { AppDispatch } from '@redux/configure-store';
import CONSTANTS from '@utils/constants';
import { Modal } from 'antd';

export const CreateTrainingFail = (redirect: () => void) => {
    Modal.error({
        title: (
            <span
                className='create-trainings-list-fail__modal-title'
                data-test-id='modal-error-user-training-title'
            >
                При сохранении данных произошла ошибка
            </span>
        ),
        content: (
            <span data-test-id='modal-error-user-training-subtitle'>
                Придётся попробовать ещё раз
            </span>
        ),
        centered: true,
        icon: <CloseCircleOutlined data-test-id='modal-error-user-training-button-close' />,
        okText: <span data-test-id='modal-error-user-training-button'>Закрыть</span>,
        onOk: () => {
            redirect();
        },
    });
};
