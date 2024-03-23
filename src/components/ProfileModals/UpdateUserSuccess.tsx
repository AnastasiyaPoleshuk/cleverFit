import { message, Alert } from 'antd';

export const UpdateUserSuccess = () => {
    message.success({
        content: (
            <Alert message='Данные профиля успешно обновлены' type='success' showIcon closable />
        ),
        icon: null,
        style: {
            marginBottom: '80px',
        },
    });
};
