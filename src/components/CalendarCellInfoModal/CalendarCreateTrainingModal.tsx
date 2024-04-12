import { Button, Divider, Empty, Modal, Select } from 'antd';
import './CalendarCellInfoModal.scss';
import { useContext, useEffect, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { IGetTrainingListResponse, IGetTrainingsResponse } from '../../types/apiTypes';
import { AppContext } from '../../context/AppContext';
import moment from 'moment';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { CreateTrainingThunk, UpdateTrainingThunk } from '@redux/thunk/TrainingThunk';

type IProps = {
    date: string;
    isModalOpen: boolean;
    trainingsListData: IGetTrainingListResponse[];
    trainingsData: IGetTrainingsResponse[];
    modalPosition: { left: string; top: string };
    closeModal: (type: string) => void;
    openInfoModal: (data: boolean) => void;
};

export const CalendarCreateTrainingModal = ({
    date,
    isModalOpen,
    trainingsListData,
    trainingsData,
    modalPosition,
    closeModal,
    openInfoModal,
}: IProps) => {
    const {
        openModal,
        updateAddExercisesData,
        saveExercisesData,
        saveExercisesDataToUpdate,
        exercisesData,
        currentExerciseName,
        addExercisesData,
    } = useContext(AppContext);
    const [exercises, setExercises] = useState<JSX.Element[]>([]);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [isExerciseChanged, setIsExerciseChanged] = useState(false);

    const [selectedExerciseName, setSelectedExerciseName] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSelectedExerciseName(
            currentExerciseName ? currentExerciseName : 'Выбор типа тренировки',
        );
        setDisabled(currentExerciseName ? false : true);

        updateAddExercisesData({ name: currentExerciseName, date: date });
    }, [currentExerciseName]);

    useEffect(() => {
        if (exercisesData.length) {
            setExercises(
                exercisesData.map((exercise, index) => (
                    <div className='training__item'>
                        <span>{exercise.name}</span>

                        <EditOutlined
                            data-test-id={`modal-update-training-edit-button${index}`}
                            style={{ color: '#2f54eb' }}
                            onClick={() => openDrawer()}
                        />
                    </div>
                )),
            );

            setSaveButtonDisabled(false);
        } else {
            setExercises([]);
        }
    }, [exercisesData]);

    const openDrawer = () => {
        openModal(CONSTANTS.DRAWER);
        setIsExerciseChanged(true);
    };

    const options = (
        trainingsListData: IGetTrainingListResponse[],
        trainingsData: IGetTrainingsResponse[],
    ) => {
        const namesSet = new Set(trainingsData.map((obj) => obj.name));

        const filteredArr = trainingsListData.filter(
            (obj) => !namesSet.has(obj.name) || obj.name === currentExerciseName,
        );

        return filteredArr.map((item) => {
            return {
                label: item.name,
                value: item.name,
            };
        });
    };

    const close = () => {
        setSelectedExerciseName('Выбор типа тренировки');
        setDisabled(true);
        openInfoModal(true);
        closeModal(CONSTANTS.ADD_TRAINING_MODAL);
    };

    const addTraining = (value: string) => {
        setIsExerciseChanged(false);
        setDisabled(false);
        updateAddExercisesData({
            name: value,
            date,
        });
        const trainingExercises = trainingsData.find((training) => training.name == value);
        saveExercisesData(trainingExercises?.exercises || []);
        setSelectedExerciseName(value);
    };

    const saveTraining = () => {
        const id = trainingsData.find((training) => training.name == addExercisesData.name)?._id;
        const request = {
            _id: id,
            name: addExercisesData.name,
            date: moment(date, CONSTANTS.DATE_FORMAT).format(CONSTANTS.DATE_FORMAT_REQUEST),
            isImplementation: moment(date, CONSTANTS.DATE_FORMAT) < moment(),
            exercises: exercisesData,
        };

        if (request._id) {
            saveExercisesDataToUpdate({ data: exercisesData, id: id ? id : '' });
            dispatch(UpdateTrainingThunk(request));
        } else {
            dispatch(CreateTrainingThunk(request));
        }
        close();
    };

    return (
        <Modal
            title={
                <header className='modal__header'>
                    <ArrowLeftOutlined
                        onClick={close}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        defaultValue={selectedExerciseName}
                        value={selectedExerciseName}
                        style={{ width: '92%' }}
                        variant={'borderless'}
                        onChange={addTraining}
                        options={options(trainingsListData, trainingsData)}
                        data-test-id='modal-create-exercise-select'
                    />
                </header>
            }
            mask={false}
            maskClosable={false}
            open={isModalOpen}
            destroyOnClose={true}
            closable={false}
            onCancel={close}
            style={{ position: 'absolute', ...modalPosition }}
            styles={{
                body: {
                    height: 91,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
            className='modal__create-training'
            data-test-id='modal-create-exercise'
            footer={
                <>
                    <Divider />
                    <Button
                        className='button__primary'
                        disabled={disabled}
                        onClick={() => openModal(CONSTANTS.DRAWER)}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        type='link'
                        className='button__primary_save-btn'
                        disabled={exercisesData.length ? false : true}
                        onClick={saveTraining}
                    >
                        {isExerciseChanged ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>
                </>
            }
        >
            {exercises.length ? (
                exercises
            ) : (
                <Empty
                    image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                    imageStyle={{
                        height: 32,
                        margin: '16px 0',
                    }}
                    description={''}
                />
            )}
        </Modal>
    );
};
