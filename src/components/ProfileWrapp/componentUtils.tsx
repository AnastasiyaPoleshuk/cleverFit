import { PlusOutlined } from '@ant-design/icons';
import { IUser, IUpdateUser } from '../../types/apiTypes';
import moment from 'moment';
import CONSTANTS from '@utils/constants';

export const getInitialValues = (user: IUser) => {
    const initialValues: IUpdateUser = {
        email: '',
    };
    if (user.firstName) {
        initialValues.firstName = user.firstName;
    }
    if (user.lastName) {
        initialValues.lastName = user.lastName;
    }
    if (user.birthday) {
        initialValues.birthday = moment(user.birthday);
    }
    if (user.email) {
        initialValues.email = user.email;
    }
    if (user.email) {
        initialValues.email = user.email;
    }
    return initialValues;
};

export const uploadButton = (
    <div style={{ padding: 16 }}>
        <PlusOutlined />
        <div style={{ marginTop: 6, width: 'min-content' }}>Загрузить фото профиля</div>
    </div>
);

export const passwordInputRules = (isPasswordRequired: boolean) => [
    {
        required: isPasswordRequired,
        message: 'пожалуйста, введите параль',
        pattern: CONSTANTS.PASSWORD_RGX,
    },
];

export const repeatPasswordInputRules = (isPasswordRequired: boolean) => [
    {
        required: isPasswordRequired,
        pattern: CONSTANTS.PASSWORD_RGX,
    },
];
