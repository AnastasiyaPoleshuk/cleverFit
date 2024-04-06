import { Avatar, Button, Modal } from 'antd';
import './TrainingModals.scss';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';

export const MyPartnerInfoModal = () => {
    const { closeModal, currentTrainingPartner, isMyTrainingPartnerInfoModalOpen } =
        useContext(AppContext);

    const close = () => {
        closeModal(CONSTANTS.MY_TRAINING_PARTNER_INFO_MODAL);
    };
    return (
        <Modal
            open={isMyTrainingPartnerInfoModalOpen}
            destroyOnClose={true}
            closable={true}
            onCancel={close}
            // style={{ position: 'absolute', ...modalPosition }}
            styles={{
                body: {
                    // height: 91,
                    // display: 'flex',
                    // flexDirection: 'column',
                    // justifyContent: 'center',
                    // alignItems: 'flex-start',
                },
            }}
            className='training-partner-info__modal'
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
                    Тренировка одобрена <CheckCircleFilled />
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

                <Button
                    type='default'
                    className='user-card__add-btn'
                    // onClick={() => openJoinTrainingDrawer(currentTrainingPartner)}
                >
                    Отменить тренировку
                </Button>
            </div>
        </Modal>
    );
};
