import { Result } from 'antd';
import './ConfirmEmailForm.scss';
import VerificationInput from 'react-verification-input';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ConfirmEmailThunk } from '@redux/thunks/ConfirmEmailThunk';
import { useEffect, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';

// TODO : разберись с поведением окошек change password. Всего флоу. Творить херню
// TODO : пересмотри роуты(нету окон result на смену пароля, но сука они отображаютя)
// TODO : пересмотри статусы ответов в thunk где-то потярялся 201 вместо 200
// TODO : actions => generic НАДА
// TODO : ну и конечно redux => redux toolkit
// TODO : внемательно посмотри верстку!! стили уплывают капец как
// TODO : разобраться с outlet на странице auth хрень с окошками result
// TODO : дописать окошки!!! Error в healthcheck и checkEmail

export const ConfirmEmailForm = () => {
    const [formError, setFormError] = useState(false);
    const { email } = useAppSelector((state) => state.user);
    const { IsConfirmEmailSuccess } = useAppSelector((state) => state.user);
    const IsError = useAppSelector((state) => state.error.isError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!IsConfirmEmailSuccess && IsError) {
            setFormError(true);
        }
        if (IsConfirmEmailSuccess && !IsError) {
            setFormError(false);
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.AUTH__PATH}${CONSTANTS.ROUTER__PATH.CHANGE_PASSWORD__PATH}`,
                ),
            );
        }
    }, [IsError]);

    const checkCode = (code: string) => {
        dispatch(
            ConfirmEmailThunk({
                email,
                code,
            }),
        );
    };
    return (
        <Result
            status={formError ? 'error' : 'info'}
            title={
                formError
                    ? 'Неверный код. Введите код для восстановления аккауанта'
                    : 'Введите код для восстановления аккауанта'
            }
            subTitle={`Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`}
            extra={
                <>
                    <VerificationInput
                        validChars='0-9'
                        placeholder=''
                        autoFocus={true}
                        onComplete={(codeString) => checkCode(codeString)}
                        classNames={{
                            character: `verification-input ${
                                formError ? 'verification-input__error' : ''
                            }`,
                        }}
                        data-test-id='verification-input'
                    />
                    <p className='confirm-email__text'>Не пришло письмо? Проверьте папку Спам.</p>
                </>
            }
        />
    );
};
