import { Avatar, Button, Card, Image, Pagination } from 'antd';
import './Components.scss';
import Search from 'antd/es/input/Search';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@utils/StoreSelectors';
import { IGetTrainingPalsResponse } from '../../../types/apiTypes';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Hightlight } from '@utils/hightlightSearch';
import { AppContext } from '../../../context/AppContext';

export const UsersForJoinTrainingSection = ({
    changePreviewState,
}: {
    changePreviewState: (data: boolean) => void;
}) => {
    const { usersForJoinTraining } = useAppSelector(trainingSelector);
    const [users, setUsers] = useState<IGetTrainingPalsResponse[]>([]);
    const [searchString, setSearchString] = useState('');
    const { setJoinTrainingDrawerStatus, saveCurrentUserForJoinTraining } = useContext(AppContext);

    const light = useCallback((str: string) => Hightlight(searchString, str), [searchString]);

    useEffect(() => {
        setUsers(usersForJoinTraining);
    }, [usersForJoinTraining]);

    const search = (searchStr: string) => {
        setSearchString(searchStr);
        console.log(searchStr);
        const searchResult = users.filter((user) =>
            user.name.toLowerCase().includes(searchStr.toLowerCase()),
        );
        console.log(searchResult);
        searchResult ? setUsers(searchResult) : setUsers(usersForJoinTraining);
    };

    const goBack = () => {
        changePreviewState(true);
    };

    const openJoinTrainingDrawer = (currentUser: IGetTrainingPalsResponse) => {
        saveCurrentUserForJoinTraining(currentUser);
        setJoinTrainingDrawerStatus(true);
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
                {users.map((user: IGetTrainingPalsResponse) => (
                    <Card
                        key={user.id}
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
                    >
                        <div className='user-card__info'>
                            <div className='user-card__type-title'>Тип тренировки:</div>
                            <div className='user-card__type-value'>{user.trainingType}</div>
                        </div>
                        <div className='user-card__info'>
                            <div className='user-card__type-title'>Средняя нагрузка:</div>
                            <div className='user-card__type-value'>{`${user.avgWeightInWeek}кг/нед`}</div>
                        </div>

                        <Button
                            type='primary'
                            className='user-card__add-btn'
                            onClick={() => openJoinTrainingDrawer(user)}
                        >
                            Создать тренировку
                        </Button>
                    </Card>
                ))}
            </main>
            <Pagination total={users.length} defaultPageSize={12} defaultCurrent={1} />
        </section>
    );
};
