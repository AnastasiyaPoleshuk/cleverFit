import { Avatar, Button, Modal } from 'antd';
import './TrainingModals.scss';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { UpdateInvitesThunk } from '@redux/thunk/InviteThunk';
import { changeStatusOfJointTraining } from '@redux/slices/InviteSlice';

export const MyPartnerInfoModal = () => {
    const { closeModal, currentTrainingPartner, isMyTrainingPartnerInfoModalOpen } =
        useContext(AppContext);
    const dispatch = useAppDispatch();

    const close = () => {
        closeModal(CONSTANTS.MY_TRAINING_PARTNER_INFO_MODAL);
    };

    const rejectInvite = () => {
        dispatch(UpdateInvitesThunk({ id: currentTrainingPartner.inviteId, status: 'rejected' }));
        dispatch(changeStatusOfJointTraining(true));
    };

    return (
        <Modal
            open={isMyTrainingPartnerInfoModalOpen}
            destroyOnClose={true}
            closable={true}
            onCancel={close}
            footer={null}
            width={540}
            data-test-id='partner-modal'
            className='training-partner-info__modal'
            styles={{
                body: { display: 'flex', justifyContent: 'space-around', padding: '24px 0' },
            }}
        >
            <div className='training-partner-info__block'>
                <div className='training-partner-info__name-wrapp'>
                    <Avatar
                        size={42}
                        icon={
                            currentTrainingPartner.imageSrc ? (
                                <img src={currentTrainingPartner.imageSrc} />
                            ) : (
                                <UserOutlined />
                            )
                        }
                    />
                    <p className='user-card__name'>{currentTrainingPartner.name}</p>
                </div>
                <p>
                    Тренировка одобрена <CheckCircleFilled style={{ color: 'green' }} />
                </p>
            </div>
            <div className='training-partner-info__block'>
                <div className='user-card__info'>
                    <div className='user-card__type-title'>Тип тренировки:</div>
                    <div className='user-card__type-value'>
                        {currentTrainingPartner.trainingType}
                    </div>
                </div>
                <div className='user-card__info'>
                    <div className='user-card__type-title'>Средняя нагрузка:</div>
                    <div className='user-card__type-value'>{`${currentTrainingPartner.avgWeightInWeek}кг/нед`}</div>
                </div>

                <Button type='default' className='user-card__add-btn' onClick={rejectInvite}>
                    Отменить тренировку
                </Button>
            </div>
        </Modal>
    );
};
