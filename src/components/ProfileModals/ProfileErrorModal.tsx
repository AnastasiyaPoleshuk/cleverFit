import { Modal } from 'antd';

export const ProfileErrorModal = () => {
    Modal.error({
        title: (
            <span className='create-trainings-list-fail__modal-title'>Файл слишком большой</span>
        ),
        content: <span>Выберите файл размером до 5 МБ.</span>,
        centered: true,
        okText: <span data-test-id='big-file-error-close'>Закрыть</span>,
    });
};
