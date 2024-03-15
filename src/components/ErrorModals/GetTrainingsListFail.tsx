import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export const GetTrainingsListFail = (setStateOfRepeatRequest: (state: boolean) => void) => {
    Modal.error({
        title: (
            <h2
                className='get-trainings-list-fail__modal-title'
                data-test-id='modal-error-user-training-title'
            >
                При открытии данных произошла ошибка
            </h2>
        ),
        content: <span data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз</span>,
        centered: true,
        closable: true,
        closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
        icon: <CloseCircleOutlined color='#2f54eb' style={{ color: '#2f54eb' }} />,
        okText: <span data-test-id='modal-error-user-training-button'>Обновить</span>,
        onOk: () => {
            setStateOfRepeatRequest(true);
        },
    });
};
