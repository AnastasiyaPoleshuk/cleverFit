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
import { UploadOutlined } from '@ant-design/icons';
import CONSTANTS, { calendarLocale } from '@utils/constants';
import { UpdateUserThunk, UploadAvatarThunk } from '@redux/thunk/userThunks';
import { IUpdateUser } from '../../types/apiTypes';
import { ProfileErrorModal } from '@components/ProfileModals/ProfileErrorModal';
import { UpdateUserFail } from '@components/ProfileModals/UpdateUserFail';
import { UpdateUserSuccess } from '@components/ProfileModals/UpdateUserSuccess';
import { useResize } from '@hooks/useResize';
import { changeUpdateUserSuccessState } from '@redux/slices/UserSlice';
import { UserSelector } from '@utils/StoreSelectors';
import {
    getInitialValues,
    passwordInputRules,
    repeatPasswordInputRules,
    uploadButton,
} from './componentUtils';

export const ProfileWrapp = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [avatar, setAvatar] = useState<UploadFile[]>([]);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isPasswordsMatch, setIsVPasswordsMatch] = useState(true);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [password, setPassword] = useState('');
    const { isScreenSm } = useResize();
    const {
        user,
        isUploadAvatarSuccess,
        accessToken,
        isUploadAvatarError,
        isUpdateUserError,
        isUpdateUserSuccess,
    } = useAppSelector(UserSelector);
    const [avatarUrl, setAvatarUrl] = useState<string>(user.imgSrc);
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsUpdateSuccess(false);
        setAvatarUrl(user.imgSrc);

        if (user.firstName || user.email || user.birthday) {
            setSubmitButtonDisabled(false);
        } else {
            setSubmitButtonDisabled(true);
        }

        if (avatarUrl) {
            setAvatar([
                {
                    uid: '0',
                    name: 'avatar',
                    status: 'done',
                    url: `${CONSTANTS.AVATAR_URL}${avatarUrl}`,
                },
            ]);
        }

        return () => {
            setIsUpdateSuccess(false);
            dispatch(changeUpdateUserSuccessState(false));
        };
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
            setAvatar([{ uid: '0', name: 'image.png', status: 'error' }]);
            ProfileErrorModal();
        }
    }, [isUploadAvatarError]);

    useEffect(() => {
        if (isUpdateUserSuccess) {
            setIsUpdateSuccess(true);
            setSubmitButtonDisabled(true);
            form.resetFields(['password', 'passwordRepeat']);
        }
    }, [isUpdateUserSuccess]);

    useEffect(() => {
        if (isUpdateUserError) {
            UpdateUserFail();
        }
    }, [isUpdateUserError]);

    const saveChanges = (values: IUpdateUser) => {
        dispatch(
            UpdateUserThunk({
                ...values,
                imgSrc: avatarUrl,
            }),
        );
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
        if (CONSTANTS.EMAIL_RGX.test(data)) {
            setIsValidEmail(true);
            setSubmitButtonDisabled(false);
        } else {
            setIsValidEmail(false);
            setSubmitButtonDisabled(true);
        }
    };

    const CheckPassword = (data: string) => {
        if (CONSTANTS.PASSWORD_RGX.test(data)) {
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

    const setRequired = () => {
        setSubmitButtonDisabled(true);
        setIsPasswordRequired(true);
    };

    const formValuesChange = () => {
        setSubmitButtonDisabled(false);
    };

    const closeModal = () => {
        setPreviewOpen(false);
    };

    return (
        <div className='profile-wrapp'>
            <Form
                form={form}
                name='update user'
                initialValues={getInitialValues(user)}
                onFinish={saveChanges}
                onValuesChange={formValuesChange}
                className='update-user__form'
                autoComplete='off'
            >
                <div className='personal-info__form-blok'>
                    <h2 className='personal-info__form-title'>Личная информация</h2>

                    <div className='personal-info__form-blok-item'>
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
                                    format={[CONSTANTS.DEFAULT_DATE_FORMAT]}
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
                        rules={passwordInputRules(isPasswordRequired)}
                        validateStatus={isValidPassword ? 'success' : 'error'}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        className='update-user__form-item'
                    >
                        <Input.Password
                            size='small'
                            placeholder='Пароль'
                            onChange={(e) => CheckPassword(e.target.value)}
                            onFocus={setRequired}
                            data-test-id='profile-password'
                        />
                    </Form.Item>

                    <Form.Item
                        name='passwordRepeat'
                        rules={repeatPasswordInputRules(isPasswordRequired)}
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
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={closeModal}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
            {isUpdateSuccess ? <UpdateUserSuccess /> : null}
        </div>
    );
};
