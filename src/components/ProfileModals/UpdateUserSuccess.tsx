import { Alert } from 'antd';

export const UpdateUserSuccess = () => (
    <Alert
        message='Данные профиля успешно обновлены'
        type='success'
        showIcon
        closable
        data-test-id='alert'
        style={{
            position: 'absolute',
            zIndex: 100,
            bottom: 80,
            borderRadius: 2,
            left: '50%',
            transform: 'translate(-50%)',
        }}
    />
);
