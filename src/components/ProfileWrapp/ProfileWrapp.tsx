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
import { UploadAvatarThunk } from '@redux/thunk/userThunks';
import { IRequestError } from '../../types/apiTypes';
import { BigImage } from '@components/ProfileModals/BigImage';
import { UpdateUserFail } from '@components/ProfileModals/UpdateUserFail';
import { UpdateUserSuccess } from '@components/ProfileModals/UpdateUserSuccess';

interface IUploadFile {
    uid: string;
    name: string;
    status: string;
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
    const [avatar, setAvatar] = useState<UploadFile>();
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isPasswordsMatch, setIsVPasswordsMatch] = useState(true);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const [password, setPassword] = useState('');
    const [registrationData, setRegistrationData] = useState({ email: '', password: '' });
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

    const saveChanges = (values: any) => {
        return;
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
            <div style={{ marginTop: 6, width: 'min-content' }}>Загрузить фото профиля</div>
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
            UpdateUserSuccess();
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

    return (
        <div className='profile-wrapp'>
            <Form
                name='update user'
                initialValues={{ remember: true }}
                onFinish={saveChanges}
                className='update-user__form'
            >
                <div className='personal-info__form-blok'>
                    <h2 className='personal-info__form-title'>Личная информация</h2>

                    <Space align='start' style={{ width: '100%' }}>
                        <Upload
                            // action={`${CONSTANTS.URL}upload-image`}
                            // headers={{
                            //     'Content-Type': 'multipart/form-data',
                            //     Authorization: `Bearer ${accessToken}`,
                            // }}
                            customRequest={customRequest}
                            beforeUpload={beforeUpload}
                            listType='picture-card'
                            onPreview={handlePreview}
                            onChange={handleChange}
                            style={{
                                padding: ' 0 17px 14px 17px',
                                width: 'fit-content !important',
                            }}
                            data-test-id='profile-avatar'
                        >
                            {avatar ? null : uploadButton}
                        </Upload>
                        <Space
                            direction='vertical'
                            style={{
                                width: '100%',
                            }}
                        >
                            <Form.Item name='firstName'>
                                <Input placeholder='Имя' data-test-id='profile-name' />
                            </Form.Item>
                            <Form.Item name='lastName'>
                                <Input placeholder='Фамилия' data-test-id='profile-surname' />
                            </Form.Item>
                            <Form.Item name='birthday'>
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
                    </Space>
                </div>
                <div className='personal-info__form-blok'>
                    <h2 className='personal-info__form-title'>Приватность и авторизация</h2>
                    <Form.Item
                        name='email'
                        rules={[{ required: true }]}
                        validateStatus={isValidEmail ? 'success' : 'error'}
                    >
                        <Input
                            addonBefore='email:'
                            data-test-id='profile-email'
                            onChange={(e) => CheckEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: 'пожалуйста, введите параль' }]}
                        validateStatus={isValidPassword ? 'success' : 'error'}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password
                            // className='form__input'
                            size='small'
                            placeholder='Пароль'
                            onChange={(e) => CheckPassword(e.target.value)}
                            data-test-id='profile-password'
                        />
                    </Form.Item>

                    <Form.Item
                        name='passwordRepeat'
                        rules={[{ required: true }]}
                        validateStatus={isPasswordsMatch ? 'success' : 'error'}
                        help={isPasswordsMatch ? '' : 'Пароли не совпадают'}
                    >
                        <Input.Password
                            // className='form__input'
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
        </div>
    );
};
