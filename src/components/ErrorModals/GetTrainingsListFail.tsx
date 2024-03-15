import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export const GetTrainingsListFail = (setStateOfRepeatRequest: (state: boolean) => void) => {
    Modal.error({
        title: (
            <h2 className='get-trainings-list-fail__modal-title'>
                При открытии данных произошла ошибка
            </h2>
        ),
        content: 'Попробуйте ещё раз',
        centered: true,
        closable: true,
        closeIcon: <CloseOutlined />,
        icon: <CloseCircleOutlined color='#2f54eb' style={{ color: '#2f54eb' }} />,
        okText: 'Обновить',
        onOk: () => {
            setStateOfRepeatRequest(true);
        },
    });
};
