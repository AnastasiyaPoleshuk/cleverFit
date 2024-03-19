import { Badge, BadgeProps, Button, Divider, Empty, Modal } from 'antd';
import './CalendarCellInfoModal.scss';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { useAppSelector } from '../../hooks/index';
import { CalendarCreateTrainingModal } from './CalendarCreateTrainingModal';
import { AppContext } from '../../context/AppContext';
import { IGetTrainingListResponse, IGetTrainingsResponse } from '../../types/apiTypes';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';

interface IProps {
    date: string;
    isModalOpen: boolean;
    trainingsData: IGetTrainingsResponse[];
    modalPosition: { left: string; top: string };
    isAddTrainingDisabled: boolean;
    setOpen: (isModalOpen: boolean) => void;
}

const getStatus = (key: string) => {
    switch (key) {
        case CONSTANTS.TRAINING_TYPE.BACK:
            return CONSTANTS.TRAINING_COLOR.BACK;
        case CONSTANTS.TRAINING_TYPE.CHEST:
            return CONSTANTS.TRAINING_COLOR.CHEST;
        case CONSTANTS.TRAINING_TYPE.HANDS:
            return CONSTANTS.TRAINING_COLOR.HANDS;
        case CONSTANTS.TRAINING_TYPE.LEGS:
            return CONSTANTS.TRAINING_COLOR.LEGS;
        case CONSTANTS.TRAINING_TYPE.STRENGTH:
            return CONSTANTS.TRAINING_COLOR.STRENGTH;
        default:
            break;
    }
};

const getTrainingsData = (
    trainingsData: IGetTrainingsResponse[],
    date: Moment,
    trainingList: IGetTrainingListResponse[],
) => {
    const currentDayTrainingsList = trainingsData.map((training) => {
        if (!training.date) {
            return;
        }

        const dt = moment(training.date);
        const trainings = [];

        if (date.date() == +dt.format('DD')) {
            const currentTraining = trainingList.find(
                (listItem) => listItem.name === training.name,
            );
            currentTraining ? trainings.push(currentTraining as IGetTrainingListResponse) : null;
            return currentTraining;
        }
        return;
    });

    if (currentDayTrainingsList?.length) {
        return currentDayTrainingsList.filter(Boolean);
    }
    return [];
};

export const CalendarCellInfoModal = ({
    date,
    isModalOpen,
    trainingsData,
    modalPosition,
    isAddTrainingDisabled,
    setOpen,
}: IProps) => {
    const { trainingList } = useAppSelector((state) => state.calendar);
    const {
        isAddTrainingModalOpen,
        saveExercisesData,
        saveCurrentExerciseName,
        openModal,
        closeModal,
    } = useContext(AppContext);

    const setButtonText = () => {
        if (moment(date, 'DD.MM.YYYY').day() >= moment().day()) {
            return 'Создать тренировку';
        } else if (trainingsData.length) {
            return 'Добавить тренировку';
        } else {
            return 'Создать тренировку';
        }
    };

    const buttonDisabledCheck = () => {
        if (trainingsData.length === trainingList.length) {
            return true;
        }
        if (isAddTrainingDisabled) {
            return true;
        }
        return false;
    };

    const openCreateTrainingModal = () => {
        saveExercisesData([]);
        saveCurrentExerciseName('');
        openModal(CONSTANTS.ADD_TRAINING_MODAL);
        setOpen(false);
    };

    const editExercisesButtonClick = (date: Moment, exerciseName: string) => {
        setOpen(false);
        const exercisesToEdit =
            trainingsData.find((item) => item.name.trim() === exerciseName)?.exercises || [];
        saveExercisesData(exercisesToEdit);
        saveCurrentExerciseName(exerciseName);
        openModal(CONSTANTS.ADD_TRAINING_MODAL);
    };

    const createTrainingsList = () => {
        const currentTrainingsList = getTrainingsData(
            trainingsData,
            moment(date, 'DD.MM.YYYY'),
            trainingList,
        );

        return (
            <ul className='events'>
                {currentTrainingsList.length ? (
                    currentTrainingsList.map((item, index) => (
                        <li key={item?.key} className='trainings__list-item'>
                            <Badge
                                color={getStatus(item ? item.key : '') as BadgeProps['color']}
                                text={item?.name}
                            />

                            <EditOutlined
                                style={{ color: '#2f54eb' }}
                                onClick={() =>
                                    editExercisesButtonClick(
                                        moment(date, 'DD.MM.YYYY'),
                                        item ? item.name : '',
                                    )
                                }
                                data-test-id={`modal-update-training-edit-button${index}`}
                            />
                        </li>
                    ))
                ) : (
                    <>
                        <p className='modal__no-content_text'>Нет активных тренировок</p>
                        <Empty
                            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                            imageStyle={{
                                height: 32,
                                margin: '16px 0',
                            }}
                            description={''}
                        />
                    </>
                )}
            </ul>
        );
    };

    return (
        <>
            <Modal
                title={`Тренировки на ${date}`}
                mask={false}
                open={isModalOpen}
                onCancel={() => setOpen(false)}
                style={{ position: 'absolute', ...modalPosition }}
                destroyOnClose={true}
                className='modal__create-training'
                data-test-id='modal-create-training'
                closeIcon={<CloseOutlined data-test-id='modal-create-training-button-close' />}
                footer={
                    <>
                        <Divider />
                        <Button
                            type='primary'
                            className='button__primary'
                            disabled={buttonDisabledCheck()}
                            onClick={() => {
                                openCreateTrainingModal();
                            }}
                        >
                            {setButtonText()}
                        </Button>
                    </>
                }
            >
                {createTrainingsList()}
            </Modal>
            <CalendarCreateTrainingModal
                date={date}
                isModalOpen={isAddTrainingModalOpen}
                trainingsListData={trainingList}
                trainingsData={trainingsData}
                modalPosition={modalPosition}
                closeModal={closeModal}
                openInfoModal={setOpen}
            />
        </>
    );
};
