import { useAppSelector } from '@hooks/index';
import './MyTrainings.scss';
import { Badge, BadgeProps, Button, Select, Table } from 'antd';
import { AppContext } from '../../../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { IGetTrainingsResponse } from '../../../../types/apiTypes';
import { getTrainingColor } from '@utils/getTrainingColor';
import { CurrentTrainingInfoModal } from '@components/TrainingModals/CurrentTrainingInfoModal';
import { getModalPosition } from '@utils/getModalPosition';
import { useResize } from '@hooks/useResize';
import { calendarSelector } from '@utils/StoreSelectors';

const getPeriodValue = (data: number) => {
    switch (data) {
        case 1:
            return 'Через 1 день';

        case 2:
            return 'Через 2 дня';

        case 3:
            return 'Через 3 дня';

        case 7:
            return '1 раз в неделю';

        default:
            return '';
    }
};

export const MyTrainings = () => {
    const [modalPosition, setModalPosition] = useState({ top: '0', left: '0' });
    const [isTrainingInfoModalOpen, setIsTrainingInfoModalOpen] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const { trainingInfo, isGetTrainingListSuccess } = useAppSelector(calendarSelector);
    const { openModal, setCurrentTrainingData } = useContext(AppContext);
    const [trainingsTableData, setTrainingsTableData] = useState(
        getTrainingsTableData(trainingInfo),
    );
    const { width: windowWidth, isScreenSm } = useResize();

    useEffect(() => {
        console.log(trainingInfo, trainingInfo.length);

        if (isSorting) {
            const sortedData = sortDataByPeriod(trainingInfo);

            setTrainingsTableData(getTrainingsTableData(sortedData));
        } else {
            setTrainingsTableData(getTrainingsTableData(trainingInfo));
        }
    }, [trainingInfo]);

    useEffect(() => {
        let sortedData: IGetTrainingsResponse[] = [];

        if (isSorting) {
            sortedData = sortDataByPeriod(trainingInfo);
            setTrainingsTableData(getTrainingsTableData(sortedData));
        } else {
            setTrainingsTableData(getTrainingsTableData(trainingInfo));
        }
    }, [isSorting]);

    const sortDataByPeriod = (data: IGetTrainingsResponse[]) => {
        return [...data].slice().sort((a, b) => a.parameters.period - b.parameters.period);
    };

    function toggleSorting() {
        setIsSorting(!isSorting);
    }

    const trainingsTableColumns = [
        {
            title: '',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: (
                <Button onClick={toggleSorting} className='trainings__table-header-select'>
                    Периодичность
                </Button>
            ),
            dataIndex: 'sorting',
            key: 'sorting',
        },
        {
            title: '',
            dataIndex: 'button',
            key: 'button',
        },
    ];

    const NoTrainingsBlock = () => (
        <div className='no-trainings__block'>
            <h5 className='no-trainings__title'>У вас еще нет созданных тренировок</h5>

            {isGetTrainingListSuccess && (
                <Button
                    className='no-trainings__button'
                    type='primary'
                    onClick={() => openModal(CONSTANTS.CREATE_TRAINING_DRAWER)}
                >
                    Создать тренировку
                </Button>
            )}
        </div>
    );

    const openTrainingInfoModal = (element: Element | null, training: IGetTrainingsResponse) => {
        setModalPosition(getModalPosition({ element, windowWidth, isScreenSm }));
        setCurrentTrainingData(training);
        setIsTrainingInfoModalOpen(true);
    };

    const closeTrainingInfoModal = () => {
        setIsTrainingInfoModalOpen(false);
    };

    function getTrainingsTableData(trainings: IGetTrainingsResponse[]) {
        const trainingsTableData = trainings.map((training, index) => {
            return {
                key: `${training.name}${index + 2}`,
                type: (
                    <div className='training-name__cell'>
                        <Badge
                            color={getTrainingColor(training.name) as BadgeProps['color']}
                            text={
                                <span className='training-name__table-cell'>{training.name}</span>
                            }
                        />
                        <DownOutlined
                            onClick={(e) =>
                                openTrainingInfoModal(e.target as Element | null, training)
                            }
                        />
                    </div>
                ),
                sorting: (
                    <span className='training-period__cell'>
                        {getPeriodValue(training.parameters.period)}
                    </span>
                ),
                button: (
                    <Button
                        type='text'
                        onClick={() => editTraining(training)}
                        className='edit_button'
                        disabled={training.isImplementation}
                        data-test-id={`update-my-training-table-icon${index}`}
                    >
                        <EditOutlined
                            style={{
                                color: training.isImplementation ? '#8c8c8c' : '#2f54eb',
                                width: 25,
                            }}
                        />
                    </Button>
                ),
            };
        });

        return [
            {
                key: 'Тип тренировки',
                type: <p className='trainings__table-header-cell-title'>Тип тренировки</p>,
                sorting: (
                    <Button className='trainings__table-header-select' onClick={toggleSorting}>
                        Периодичность
                    </Button>
                ),
                button: <></>,
            },
            ...trainingsTableData,
        ];
    }

    const editTraining = (training: IGetTrainingsResponse) => {
        setCurrentTrainingData(training);
        openModal(CONSTANTS.CREATE_TRAINING_DRAWER);
    };

    const openDrawer = () => {
        setCurrentTrainingData({
            _id: '',
            name: '',
            date: '',
            isImplementation: false,
            userId: '',
            parameters: {
                repeat: false,
                period: 0,
                jointTraining: false,
                participants: [],
            },
            exercises: [],
        });
        openModal(CONSTANTS.CREATE_TRAINING_DRAWER);
    };

    return (
        <div className='my-training__content'>
            {trainingInfo.length ? (
                <>
                    <Table
                        dataSource={trainingsTableData}
                        columns={trainingsTableColumns}
                        pagination={
                            trainingsTableData.length > 12
                                ? { position: ['bottomLeft'], pageSize: 12 }
                                : false
                        }
                        showHeader={false}
                        className='trainings__table'
                        rowClassName='trainings__table-rows'
                        data-test-id='my-trainings-table'
                    />
                    {isGetTrainingListSuccess && (
                        <Button
                            className='create-new-training__btn'
                            type='primary'
                            onClick={openDrawer}
                            data-test-id='create-new-training-button'
                        >
                            <PlusOutlined />
                            Новая тренировка
                        </Button>
                    )}
                </>
            ) : (
                <NoTrainingsBlock />
            )}

            <CurrentTrainingInfoModal
                isModalOpen={isTrainingInfoModalOpen}
                modalPosition={modalPosition}
                close={closeTrainingInfoModal}
            />
        </div>
    );
};
