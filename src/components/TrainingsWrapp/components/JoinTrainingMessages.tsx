import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { invitesSelector } from '@utils/StoreSelectors';
import './Components.scss';
import { Avatar, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import CONSTANTS from '@utils/constants';
import { UpdateInvitesThunk } from '@redux/thunk/InviteThunk';
import { IGetInviteResponse } from '../../../types/apiTypes';
import { useState } from 'react';
import { TrainingDetails } from '@components/TrainingModals/TrainingDetails';
import { useResize } from '@hooks/useResize';

export const JoinTrainingMessages = () => {
    const [modalPosition, setModalPosition] = useState({ top: '', left: '' });
    const { myInvites } = useAppSelector(invitesSelector);

    const { width: windowWidth, isScreenSm } = useResize();

    const dispatch = useAppDispatch();

    const rejectInvite = (inviteId: string) => {
        dispatch(UpdateInvitesThunk({ id: inviteId, status: 'rejected' }));
    };

    const acceptInvite = (inviteId: string) => {
        dispatch(UpdateInvitesThunk({ id: inviteId, status: 'accepted' }));
    };

    const openTrainingDetailsModal = (invite: IGetInviteResponse) => {
        TrainingDetails({
            currentTrainingInvite: invite,
        });
    };

    return (
        <section className='messages__section'>
            <p className='messages__title'>Новые сообщения ({myInvites.length})</p>

            <div className='messages__wrapp'>
                {myInvites.map((invite) => (
                    <Card key={invite._id} className='messages__card card'>
                        <div className='card__info'>
                            <Avatar
                                icon={
                                    invite.from.imageSrc ? (
                                        <img src={invite.from.imageSrc} />
                                    ) : (
                                        <UserOutlined />
                                    )
                                }
                            />
                            <p className='user-card__name'>{invite.from.firstName}</p>
                            <p className='user-card__name'>{invite.from.lastName}</p>
                        </div>
                        <div className='card__info'>
                            <div className='card__date'>
                                {moment(invite.createdAt).format(CONSTANTS.DATE_FORMAT)}
                            </div>
                            <p className='card__text'>
                                Привет, я ищу партнёра для совместных тренировок (
                                {invite.training.name}). Ты хочешь присоединиться ко мне на
                                следующих тренировках?
                            </p>
                            <Button
                                type='link'
                                className='card__info-button'
                                onClick={() => openTrainingDetailsModal(invite)}
                            >
                                Посмотреть детали тренировки
                            </Button>
                        </div>
                        <div className='card__info'>
                            <Button
                                type='primary'
                                className='card__btn'
                                onClick={() => acceptInvite(invite._id)}
                            >
                                Тренироваться вместе
                            </Button>
                            <Button
                                type='default'
                                className='card__btn'
                                onClick={() => rejectInvite(invite._id)}
                            >
                                Отклонить запрос
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};
