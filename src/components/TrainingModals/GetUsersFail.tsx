import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export const GetUsersFail = (repeatRequest: () => void, clearError: () => void) => {
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
        closable: true,
        closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
        icon: <CloseCircleOutlined />,
        okText: <span data-test-id='modal-error-user-training-button'>Закрыть</span>,
        onCancel: () => {
            clearError();
        },
        onOk: () => {
            repeatRequest();
        },
    });
};
