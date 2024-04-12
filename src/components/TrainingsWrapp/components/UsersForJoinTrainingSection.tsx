import { Avatar, Button, Card, Pagination, Tooltip } from 'antd';
import './Components.scss';
import Search from 'antd/es/input/Search';
import {
    ArrowLeftOutlined,
    CheckCircleFilled,
    ExclamationCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { invitesSelector, trainingSelector } from '@utils/StoreSelectors';
import { IGetTrainingPalsResponse } from '../../../types/apiTypes';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Hightlight } from '@utils/hightlightSearch';
import { AppContext } from '../../../context/AppContext';
import CONSTANTS from '@utils/constants';
import { UpdateInvitesThunk } from '@redux/thunk/InviteThunk';
import {
    changeGetUsersForJointTrainingSuccessState,
    changeUsersForJointTrainingStatus,
} from '@redux/slices/TrainingSlice';
import { getCardsForCurrentPage } from '@utils/getCardsForCurrentPage';

export const UsersForJoinTrainingSection = ({
    changePreviewState,
}: {
    changePreviewState: (data: boolean) => void;
}) => {
    const { isCreatedInviteSuccess } = useAppSelector(invitesSelector);
    const { usersForJoinTraining } = useAppSelector(trainingSelector);
    const [users, setUsers] = useState<IGetTrainingPalsResponse[]>([]);
    const [searchString, setSearchString] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const {
        setJoinTrainingDrawerStatus,
        saveCurrentUserForJoinTraining,
        currentUserForJoinTraining,
    } = useContext(AppContext);
    const dispatch = useAppDispatch();

    const light = useCallback((str: string) => Hightlight(searchString, str), [searchString]);

    useEffect(() => {
        if (isCreatedInviteSuccess) {
            dispatch(
                changeUsersForJointTrainingStatus({
                    id: currentUserForJoinTraining.id,
                    status: CONSTANTS.USER_INVITE_STATUS.PENDING,
                }),
            );
        }
    }, [isCreatedInviteSuccess]);

    useEffect(() => {
        if (searchString) {
            const searchResult = usersForJoinTraining.filter((user) =>
                user.name.toLowerCase().includes(searchString.toLowerCase()),
            );
            searchResult
                ? setUsers(getCardsForCurrentPage(searchResult, pageNumber))
                : setUsers(getCardsForCurrentPage(usersForJoinTraining, pageNumber));
        } else {
            setUsers(getCardsForCurrentPage(usersForJoinTraining, pageNumber));
        }
    }, [usersForJoinTraining]);

    const search = (searchStr: string) => {
        setSearchString(searchStr);
        if (searchStr) {
            const searchResult = users.filter((user) =>
                user.name.toLowerCase().includes(searchStr.toLowerCase()),
            );
            searchResult
                ? setUsers(getCardsForCurrentPage(searchResult, pageNumber))
                : setUsers(getCardsForCurrentPage(usersForJoinTraining, pageNumber));
        } else {
            setUsers(getCardsForCurrentPage(usersForJoinTraining, pageNumber));
        }
    };

    const goBack = () => {
        changePreviewState(true);
        dispatch(changeGetUsersForJointTrainingSuccessState(false));
    };

    const rejectTraining = (id: string) => {
        dispatch(UpdateInvitesThunk({ id, status: CONSTANTS.USER_INVITE_STATUS.REJECTED }));
    };

    const getCardButton = (user: IGetTrainingPalsResponse) => {
        switch (user.status) {
            case CONSTANTS.USER_INVITE_STATUS.ACCEPTED:
                return (
                    <>
                        <Button
                            type='default'
                            className='user-card__add-btn'
                            onClick={() => rejectTraining(user.inviteId)}
                        >
                            Отменить тренировку
                        </Button>
                        <div className='invite-status__wrapp'>
                            <span>
                                тренировка одобрена <CheckCircleFilled style={{ color: 'green' }} />
                            </span>
                        </div>
                    </>
                );
            case CONSTANTS.USER_INVITE_STATUS.PENDING:
                return (
                    <>
                        <Button type='primary' className='user-card__add-btn' disabled={true}>
                            Создать тренировку
                        </Button>
                        <div className='invite-status__wrapp'>
                            <span>ожидает подтверждения</span>
                        </div>
                    </>
                );
            case CONSTANTS.USER_INVITE_STATUS.REJECTED:
                return (
                    <>
                        <Button type='primary' className='user-card__add-btn' disabled={true}>
                            Создать тренировку
                        </Button>
                        <div className='invite-status__wrapp'>
                            <span>
                                <Tooltip
                                    placement='topRight'
                                    title='повторный запрос будет доступнен через 2 недели'
                                >
                                    тренировка отклонена
                                </Tooltip>

                                <ExclamationCircleOutlined />
                            </span>
                        </div>
                    </>
                );
            default:
                return (
                    <Button
                        type='primary'
                        className='user-card__add-btn'
                        onClick={() => openJoinTrainingDrawer(user)}
                    >
                        Создать тренировку
                    </Button>
                );
        }
    };

    const openJoinTrainingDrawer = (currentUser: IGetTrainingPalsResponse) => {
        saveCurrentUserForJoinTraining(currentUser);
        setJoinTrainingDrawerStatus(true);
    };

    const changePage = (page: number) => {
        setPageNumber(page);
        setUsers(getCardsForCurrentPage(usersForJoinTraining, page));
    };

    return (
        <section className='users-for-join__section section'>
            <header className='section__header'>
                <Button type='text' className='section__header-goBack-btn' onClick={goBack}>
                    <ArrowLeftOutlined />
                    <span>Назад</span>
                </Button>
                <Search
                    placeholder='Поиск по имени'
                    className='section__header-search'
                    data-test-id='search-input'
                    onSearch={search}
                    styles={{
                        input: {
                            height: 32,
                        },
                    }}
                />
            </header>
            <main className='section__main'>
                {users.map((user, index) => (
                    <Card
                        key={user.id}
                        data-test-id={`joint-training-cards${index}`}
                        title={
                            <div className='user-card__header'>
                                <Avatar
                                    size={42}
                                    icon={
                                        user.imageSrc ? (
                                            <img src={user.imageSrc} />
                                        ) : (
                                            <UserOutlined />
                                        )
                                    }
                                />
                                <p className='user-card__name'>{light(user.name)}</p>
                            </div>
                        }
                        hoverable
                        bordered={false}
                        className='section__main-user-card user-card'
                        styles={{
                            header: {
                                padding: 0,
                            },
                            body: {
                                padding: 0,
                            },
                        }}
                        style={
                            user.status === CONSTANTS.USER_INVITE_STATUS.REJECTED
                                ? { background: '#bfbfbf' }
                                : { background: '#f0f5ff' }
                        }
                    >
                        <div className='user-card__info'>
                            <div className='user-card__type-title'>Тип тренировки:</div>
                            <div className='user-card__type-value'>{user.trainingType}</div>
                        </div>
                        <div className='user-card__info'>
                            <div className='user-card__type-title'>Средняя нагрузка:</div>
                            <div className='user-card__type-value'>{`${user.avgWeightInWeek}кг/нед`}</div>
                        </div>

                        {getCardButton(user)}
                    </Card>
                ))}
            </main>
            <Pagination
                total={usersForJoinTraining.length}
                defaultPageSize={CONSTANTS.PAGINATION_PAGE_SIZE_DEFAULT}
                onChange={changePage}
                defaultCurrent={pageNumber}
                style={{ marginTop: 16 }}
            />
        </section>
    );
};
