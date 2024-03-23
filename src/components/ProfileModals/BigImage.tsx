import { CloseCircleOutlined } from '@ant-design/icons';
import { AppDispatch } from '@redux/configure-store';
import CONSTANTS from '@utils/constants';
import { Modal } from 'antd';

export const BigImage = () => {
    Modal.error({
        title: (
            <span className='create-trainings-list-fail__modal-title'>Файл слишком большой</span>
        ),
        content: <span>Выберите файл размером 5 МБ. </span>,
        centered: true,
        okText: <span data-test-id='big-file-error-close'>Закрыть</span>,
        // onOk: () => {
        //     redirect();
        // },
    });
};
