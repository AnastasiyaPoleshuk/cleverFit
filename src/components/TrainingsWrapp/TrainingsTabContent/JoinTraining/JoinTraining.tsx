import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import './JoinTraining.scss';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { GetTrainingPalsThunk } from '@redux/thunk/TrainingThunk';
import { IGetInviteResponse, IGetTrainingPalsResponse } from '../../../../types/apiTypes';
import { UserSelector, invitesSelector, trainingSelector } from '@utils/StoreSelectors';
import { JoinTrainingPreview } from '@components/TrainingsWrapp/components/JoinTrainingPreview';
import { UsersForJoinTrainingSection } from '@components/TrainingsWrapp/components/UsersForJoinTrainingSection';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AppContext } from '../../../../context/AppContext';
import CONSTANTS from '@utils/constants';
import { JoinTrainingMessages } from '@components/TrainingsWrapp/components/JoinTrainingMessages';
import { GetInvitesThunk } from '@redux/thunk/InviteThunk';

export const JoinTraining = () => {
    const [isPreview, setIsPreview] = useState(true);
    const [trainingPals, setTrainingPals] = useState<IGetTrainingPalsResponse[]>([]);
    const [myInvites, setMyInvites] = useState<IGetInviteResponse[]>([]);
    const { isGeTrainingPalsSuccess, trainingPals: trainingPalsStore } =
        useAppSelector(trainingSelector);
    const { accessToken } = useAppSelector(UserSelector);
    const {
        myInvites: myInvitesStore,
        isUpdateInviteStatusSuccess,
        isTrainingRejected,
        isGetMyInvitesSuccess,
    } = useAppSelector(invitesSelector);

    const { openModal, saveCurrentTrainingPartner, currentTrainingPartner } =
        useContext(AppContext);

    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        dispatch(GetTrainingPalsThunk());
        dispatch(GetInvitesThunk(accessToken));
    }, []);

    useLayoutEffect(() => {
        if (isGetMyInvitesSuccess) {
            setMyInvites(myInvitesStore);
        }
    }, [myInvitesStore]);

    useEffect(() => {
        if (isUpdateInviteStatusSuccess && !isTrainingRejected) {
            dispatch(GetTrainingPalsThunk());
        }

        if (isUpdateInviteStatusSuccess && isTrainingRejected) {
            setTrainingPals(trainingPals.filter((item) => item.id !== currentTrainingPartner.id));
        }
    }, [isUpdateInviteStatusSuccess]);

    useEffect(() => {
        if (isGeTrainingPalsSuccess) {
            setTrainingPals(trainingPalsStore);
        }
    }, [trainingPalsStore]);

    const openUserInfoModal = (currentUser: IGetTrainingPalsResponse) => {
        openModal(CONSTANTS.MY_TRAINING_PARTNER_INFO_MODAL);
        saveCurrentTrainingPartner(currentUser);
    };

    return (
        <div className='join-training__content'>
            {myInvites.length ? <JoinTrainingMessages /> : null}
            {isPreview ? (
                <JoinTrainingPreview changePreviewState={setIsPreview} />
            ) : (
                <UsersForJoinTrainingSection changePreviewState={setIsPreview} />
            )}
            {isPreview && (
                <div className='my-partners__block'>
                    <h4 className='my-partners__block-title'>Мои партнеры по тренировками</h4>
                    <div className='my-partners__cards-wrapp'>
                        {trainingPals.length ? (
                            trainingPals.map((item, index) => (
                                <Card
                                    key={item.id}
                                    title={
                                        <div className='user-card__header'>
                                            <Avatar
                                                size={42}
                                                icon={
                                                    item.imageSrc ? (
                                                        <img src={item.imageSrc} />
                                                    ) : (
                                                        <UserOutlined />
                                                    )
                                                }
                                            />
                                            <p className='user-card__name'>{item.name}</p>
                                        </div>
                                    }
                                    hoverable
                                    onClick={() => openUserInfoModal(item)}
                                    bordered={false}
                                    data-test-id={`joint-training-cards${index}`}
                                    className='section__main-user-card user-card'
                                    styles={{
                                        header: {
                                            padding: 0,
                                        },
                                        body: {
                                            padding: 0,
                                        },
                                    }}
                                >
                                    <div className='user-card__info'>
                                        <div className='user-card__type-title'>Тип тренировки:</div>
                                        <div className='user-card__type-value'>
                                            {item.trainingType}
                                        </div>
                                    </div>
                                    <div className='user-card__info'>
                                        <div className='user-card__type-title'>
                                            Средняя нагрузка:
                                        </div>
                                        <div className='user-card__type-value'>{`${item.avgWeightInWeek}кг/нед`}</div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className='my-partners__block-subtitle'>
                                У вас пока нет партнёров для совместных тренировок
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
