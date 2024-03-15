import { CloseCircleOutlined } from '@ant-design/icons';
import { AppDispatch } from '@redux/configure-store';
import CONSTANTS from '@utils/constants';
import { Modal } from 'antd';

export const CreateTrainingFail = (redirect: () => void) => {
    Modal.error({
        title: `При сохранении данных произошла ошибка`,
        content: 'Придётся попробовать ещё раз',
        centered: true,
        icon: <CloseCircleOutlined />,
        okText: 'Закрыть',
        onOk: () => {
            redirect();
        },
    });
};
