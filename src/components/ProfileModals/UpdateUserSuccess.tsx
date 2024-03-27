import { message, Alert } from 'antd';

export const UpdateUserSuccess = () => {
    return (
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
                left: '50%',
            }}
        />
    );
};
