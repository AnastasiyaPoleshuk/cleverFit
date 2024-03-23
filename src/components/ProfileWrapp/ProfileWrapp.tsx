import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import './ProfileWrapp.scss';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Space,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import CONSTANTS, { calendarLocale } from '@utils/constants';
import { RcFile } from 'antd/es/upload';
import { UpdateUserThunk, UploadAvatarThunk } from '@redux/thunk/userThunks';
import { IRequestError, IUpdateUser } from '../../types/apiTypes';
import { BigImage } from '@components/ProfileModals/BigImage';
import { UpdateUserFail } from '@components/ProfileModals/UpdateUserFail';
import { UpdateUserSuccess } from '@components/ProfileModals/UpdateUserSuccess';
import moment from 'moment';

interface IUpdateUserForm {
    firstName?: string;
    lastName?: string;
    birthday?: string;
    url: string;
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const ProfileWrapp = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [uploadError, setUploadError] = useState<IRequestError>();
    const [isErr, setIsError] = useState(false);
    const [avatar, setAvatar] = useState<UploadFile>();
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isPasswordsMatch, setIsVPasswordsMatch] = useState(true);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [password, setPassword] = useState('');
    const {
        user,
        isUploadAvatarSuccess,
        accessToken,
        isUploadAvatarError,
        error,
        isUpdateUserError,
    } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.imgSrc) {
            setAvatar({ uid: '0', name: 'avatar', status: 'done', url: user.imgSrc });
        }
    }, []);

    useEffect(() => {
        if (isUploadAvatarSuccess) {
            setAvatar({ uid: '0', name: 'avatar', status: 'done', url: user.imgSrc });
        }
    }, [isUploadAvatarSuccess]);

    useEffect(() => {
        if (isUploadAvatarError) {
            setUploadError(error);
        }
    }, [isUploadAvatarError]);

    useEffect(() => {
        if (isUpdateUserError) {
            UpdateUserFail();
        }
    }, [isUpdateUserError]);

    const saveChanges = (values: IUpdateUser) => {
        console.log(values);

        dispatch(UpdateUserThunk(values));
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            return;
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 6, width: 'min-content' }} data-test-id='profile-avatar'>
                Загрузить фото профиля
            </div>
        </div>
    );

    const handleChange: UploadProps['onChange'] = async ({ file }) => {
        console.log(file);

        if (file.status === 'error') {
            setSubmitButtonDisabled(true);
        }
        // if (file.status === 'uploading') {
        // }
        if (file.status === 'done') {
            setSubmitButtonDisabled(false);
            setAvatar(file);
        }
    };

    const customRequest: UploadProps['customRequest'] = (options) => {
        const { onSuccess, onError, file, onProgress } = options;

        dispatch(UploadAvatarThunk({ token: accessToken, file }));

        onError(uploadError);
    };

    const beforeUpload = (file: UploadFile) => {
        if (file.size > 625000) {
            // BigImage();
            setIsError(true);
            console.log(file.size);
            return false;
        }
        return true;
    };

    const CheckEmail = (data: string) => {
        if (/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(data)) {
            setIsValidEmail(true);
            setSubmitButtonDisabled(false);
        } else {
            setIsValidEmail(false);
            setSubmitButtonDisabled(true);
        }
    };

    const CheckPassword = (data: string) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data)) {
            setIsValidPassword(true);
            setSubmitButtonDisabled(false);
        } else {
            setIsValidPassword(false);
            setSubmitButtonDisabled(true);
        }
        setIsVPasswordsMatch(false);
        setPassword(data);
    };

    const CheckPasswordsMatch = (repeatedPassword: string) => {
        if (repeatedPassword === password) {
            setSubmitButtonDisabled(false);
            setIsVPasswordsMatch(true);
        } else {
            setSubmitButtonDisabled(true);
            setIsVPasswordsMatch(false);
        }
    };

    const getInitialValues = () => {
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
            initialValues.birthday = moment(user.birthday).format('DD.MM.YYYY');
        }
        if (user.email) {
            initialValues.email = user.email;
        }
        if (user.email) {
            initialValues.email = user.email;
        }
        console.log('initialValues: ', initialValues);

        return initialValues;
    };

    const setRequired = () => {
        setSubmitButtonDisabled(true);
        setIsPasswordRequired(true);
    };

    return (
        <div className='profile-wrapp'>
            <Form
                name='update user'
                initialValues={getInitialValues()}
                onFinish={saveChanges}
                className='update-user__form'
            >
                <div className='personal-info__form-blok'>
                    <h2 className='personal-info__form-title'>Личная информация</h2>

                    <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
                        <Upload
                            customRequest={customRequest}
                            beforeUpload={beforeUpload}
                            listType='picture-card'
                            onPreview={handlePreview}
                            onChange={handleChange}
                            className='upload-avatar'
                        >
                            {avatar ? null : uploadButton}
                        </Upload>
                        <Space
                            direction='vertical'
                            style={{
                                width: '100%',
                            }}
                        >
                            <Form.Item name='firstName' className='update-user__form-item'>
                                <Input placeholder='Имя' data-test-id='profile-name' />
                            </Form.Item>
                            <Form.Item name='lastName' className='update-user__form-item'>
                                <Input placeholder='Фамилия' data-test-id='profile-surname' />
                            </Form.Item>
                            <Form.Item name='birthday' className='update-user__form-item'>
                                <DatePicker
                                    placeholder='Дата рождения'
                                    size='large'
                                    locale={calendarLocale}
                                    format='DD.MM.YYYY'
                                    data-test-id='profile-birthday'
                                    style={{
                                        width: '100%',
                                        borderRadius: 2,
                                    }}
                                />
                            </Form.Item>
                        </Space>
                    </div>
                </div>
                <div className='personal-info__form-blok'>
                    <h2 className='personal-info__form-title'>Приватность и авторизация</h2>
                    <Form.Item
                        name='email'
                        rules={[{ required: true }]}
                        validateStatus={isValidEmail ? 'success' : 'error'}
                        className='update-user__form-item'
                    >
                        <Input
                            addonBefore='email:'
                            data-test-id='profile-email'
                            onChange={(e) => CheckEmail(e.target.value)}
                            className='update-user__form-item'
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[
                            { required: isPasswordRequired, message: 'пожалуйста, введите параль' },
                        ]}
                        validateStatus={isValidPassword ? 'success' : 'error'}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        className='update-user__form-item'
                    >
                        <Input.Password
                            size='small'
                            placeholder='Пароль'
                            onChange={(e) => CheckPassword(e.target.value)}
                            // onFocus={() => console.log('focus')}
                            onFocus={() => setRequired()}
                            data-test-id='profile-password'
                        />
                    </Form.Item>

                    <Form.Item
                        name='passwordRepeat'
                        rules={[{ required: isPasswordRequired }]}
                        validateStatus={isPasswordsMatch ? 'success' : 'error'}
                        help={isPasswordsMatch ? '' : 'Пароли не совпадают'}
                        className='update-user__form-item'
                    >
                        <Input.Password
                            size='small'
                            placeholder='Пароль'
                            onChange={(e) => CheckPasswordsMatch(e.target.value)}
                            data-test-id='profile-repeat-password'
                        />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button
                        type='primary'
                        data-test-id='profile-submit'
                        htmlType='submit'
                        disabled={submitButtonDisabled}
                        style={{ borderRadius: 2, width: 206, height: 40, marginTop: 24 }}
                    >
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
            {isErr && <UpdateUserSuccess />}
        </div>
    );
};
