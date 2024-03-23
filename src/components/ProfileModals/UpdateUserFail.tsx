import { Modal } from 'antd';

export const UpdateUserFail = () => {
    Modal.error({
        title: (
            <span className='create-trainings-list-fail__modal-title'>
                При сохранении данных произошла ошибка
            </span>
        ),
        content: <span>Придётся попробовать ещё раз </span>,
        centered: true,
        okText: <span data-test-id='big-file-error-close'>Закрыть</span>,
    });
};
