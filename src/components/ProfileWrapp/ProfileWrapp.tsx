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
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import CONSTANTS, { calendarLocale } from '@utils/constants';
import { UpdateUserThunk, UploadAvatarThunk } from '@redux/thunk/userThunks';
import { IUpdateUser } from '../../types/apiTypes';
import { ProfileErrorModal } from '@components/ProfileModals/ProfileErrorModal';
import { UpdateUserFail } from '@components/ProfileModals/UpdateUserFail';
import { UpdateUserSuccess } from '@components/ProfileModals/UpdateUserSuccess';
import moment from 'moment';
import { useResize } from '@hooks/useResize';

export const ProfileWrapp = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [avatar, setAvatar] = useState<UploadFile[]>([]);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isPasswordsMatch, setIsVPasswordsMatch] = useState(true);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [password, setPassword] = useState('');
    const { width: windowWidth, isScreenSm } = useResize();
    const {
        user,
        isUploadAvatarSuccess,
        accessToken,
        isUploadAvatarError,
        isUpdateUserError,
        isUpdateUserSuccess,
    } = useAppSelector((state) => state.user);
    const [avatarUrl, setAvatarUrl] = useState<string>(user.imgSrc);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setAvatarUrl(user.imgSrc);
        setSubmitButtonDisabled(true);
        if (avatarUrl) {
            setAvatar([{ uid: '0', name: 'avatar', status: 'done', url: avatarUrl }]);
        }
    }, []);

    useEffect(() => {
        if (isUploadAvatarSuccess) {
            setAvatarUrl(user.imgSrc);
            setSubmitButtonDisabled(false);
            setAvatar([
                {
                    uid: '0',
                    name: 'avatar',
                    status: 'done',
                    url: `${CONSTANTS.AVATAR_URL}${user?.imgSrc}`,
                },
            ]);
        }
    }, [isUploadAvatarSuccess]);

    useEffect(() => {
        if (isUploadAvatarError) {
            setSubmitButtonDisabled(true);
            setAvatar([]);
            ProfileErrorModal();
        }
    }, [isUploadAvatarError]);

    useEffect(() => {
        if (isUpdateUserSuccess) {
            setIsUpdateSuccess(true);
            setSubmitButtonDisabled(true);
        }
    }, [isUpdateUserSuccess]);

    useEffect(() => {
        if (isUpdateUserError) {
            UpdateUserFail();
        }
    }, [isUpdateUserError]);

    const saveChanges = (values: IUpdateUser) => {
        dispatch(UpdateUserThunk(values));
        setSubmitButtonDisabled(true);
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
        <div style={{ padding: 16 }}>
            <PlusOutlined />
            <div style={{ marginTop: 6, width: 'min-content' }}>Загрузить фото профиля</div>
        </div>
    );

    const handleChange: UploadProps['onChange'] = async ({ file }) => {
        const status = file.status;
        if (status && status == 'removed') {
            setAvatarUrl('');
            setAvatar([{ uid: '0', name: 'image.png', status: 'error' }]);
        }
        if (status && status == 'uploading') {
            setAvatar([{ uid: '0', percent: 50, name: 'image.png', status: 'uploading' }]);
        }
    };

    const customRequest: UploadProps['customRequest'] = (options) => {
        const { file } = options;

        const formData = new FormData();
        formData.append('file', file);
        dispatch(UploadAvatarThunk({ token: accessToken, file: formData }));
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
                onValuesChange={() => setSubmitButtonDisabled(false)}
                className='update-user__form'
                autoComplete='off'
            >
                <div className='personal-info__form-blok'>
                    <h2 className='personal-info__form-title'>Личная информация</h2>

                    <div className='personal-info__form-blok-item' style={{}}>
                        <Form.Item data-test-id='profile-avatar'>
                            {isScreenSm ? (
                                <div className='mobile__upload-box'>
                                    <h5 className='mobile__upload-title'>
                                        Загрузить фото профиля:
                                    </h5>
                                    <Upload
                                        customRequest={customRequest}
                                        fileList={avatar}
                                        onChange={handleChange}
                                        className='mobile__upload-btn'
                                    >
                                        <Button icon={<UploadOutlined />}>Загрузить</Button>
                                    </Upload>
                                </div>
                            ) : (
                                <Upload
                                    customRequest={customRequest}
                                    fileList={avatar}
                                    listType='picture-card'
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    className='upload-avatar'
                                >
                                    {avatar.length > 0 ? null : uploadButton}
                                </Upload>
                            )}
                        </Form.Item>
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
                                    format={['DD.MM.YYYY']}
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
                        rules={[{ type: 'email' }]}
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
                            {
                                required: isPasswordRequired,
                                message: 'пожалуйста, введите параль',
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                            },
                        ]}
                        validateStatus={isValidPassword ? 'success' : 'error'}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        className='update-user__form-item'
                    >
                        <Input.Password
                            size='small'
                            placeholder='Пароль'
                            onChange={(e) => CheckPassword(e.target.value)}
                            onFocus={() => setRequired()}
                            data-test-id='profile-password'
                        />
                    </Form.Item>

                    <Form.Item
                        name='passwordRepeat'
                        rules={[
                            {
                                required: isPasswordRequired,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                            },
                        ]}
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
                        className='form__submit-btn'
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
            {isUpdateSuccess && <UpdateUserSuccess />}
        </div>
    );
};
