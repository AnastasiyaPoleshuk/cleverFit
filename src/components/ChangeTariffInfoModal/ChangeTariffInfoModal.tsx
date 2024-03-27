import { Modal, Result } from 'antd';
import './ChangeTariffInfoModal.scss';
import { CheckCircleFilled } from '@ant-design/icons';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setToken, changeAuthState } from '@redux/slices/UserSlice';
import { push } from 'redux-first-history';

export const ChangeTariffInfoModal = ({ isModalOpen }: { isModalOpen: boolean }) => {
    const { closeModal } = useContext(AppContext);
    const { user } = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();

    const logOut = () => {
        dispatch(push(CONSTANTS.ROUTER__PATH.AUTH__PATH));
        dispatch(setToken(''));
        dispatch(changeAuthState(false));
        localStorage.removeItem('jwtToken');
        closeModal(CONSTANTS.CHANGE_TARIFF_INFO_MODAL);
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={logOut}
            data-test-id='tariff-modal-success'
            footer={null}
        >
            <Result
                status='success'
                icon={<CheckCircleFilled style={{ color: '#2f54eb' }} />}
                title='Чек для оплаты у вас на почте'
                subTitle={`Мы отправили инструкцию для оплаты вам на e-mail ${user.email}. После подтверждения оплаты войдите в приложение заново.`}
                extra='Не пришло письмо? Проверьте папку Спам.'
            />
        </Modal>
    );
};
