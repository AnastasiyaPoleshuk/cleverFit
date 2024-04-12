import { useAppDispatch, useAppSelector } from '@hooks/index';
import './MyTrainings.scss';
import { Badge, BadgeProps, Button, Table } from 'antd';
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
import { getPeriodValue } from '@utils/getPeriod';
import { changeTrainingParametersValue } from '@redux/slices/CalendarSlice';
import { sortDirection, sortTrainingsDataByPeriod } from '@utils/sortTrainingsDataByPeriod';

export const MyTrainings = () => {
    const [modalPosition, setModalPosition] = useState({ top: '0', left: '0' });
    const [isTrainingInfoModalOpen, setIsTrainingInfoModalOpen] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [pageSize, setPageSize] = useState(CONSTANTS.PAGINATION_PAGE_SIZE_DEFAULT);
    const { trainingInfo, isGetTrainingListSuccess } = useAppSelector(calendarSelector);
    const { openModal, setCurrentTrainingData } = useContext(AppContext);
    const [trainingsTableData, setTrainingsTableData] = useState(
        getTrainingsTableData(trainingInfo),
    );
    const dispatch = useAppDispatch();

    const { width: windowWidth, isScreenSm } = useResize();

    useEffect(() => {
        const trainings = trainingInfo.map((training, index) => {
            if (training.id === '12' && training.parameters.repeat !== true) {
                dispatch(changeTrainingParametersValue({ index, value: true }));
            }

            return training;
        });

        setTrainingsTableData(getTrainingsTableData(trainings));
        setIsSorting(false);
    }, [trainingInfo]);

    useEffect(() => {
        if (isScreenSm) {
            setPageSize(CONSTANTS.PAGINATION_PAGE_SIZE_MOBILE);
        } else {
            setPageSize(CONSTANTS.PAGINATION_PAGE_SIZE_DEFAULT);
        }
    }, [windowWidth]);

    useEffect(() => {
        let sortedData: IGetTrainingsResponse[] = [];

        if (isSorting) {
            sortedData = sortTrainingsDataByPeriod(trainingInfo, sortDirection.Asc);
            setTrainingsTableData(getTrainingsTableData(sortedData));
        } else {
            sortedData = sortTrainingsDataByPeriod(trainingInfo, sortDirection.Desc);
            setTrainingsTableData(getTrainingsTableData(sortedData));
        }
    }, [isSorting]);

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
                        {getPeriodValue(
                            training.parameters.repeat === true ? training.parameters.period : 0,
                        )}
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
                            trainingsTableData.length > pageSize
                                ? { position: ['bottomLeft'], pageSize: pageSize }
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
