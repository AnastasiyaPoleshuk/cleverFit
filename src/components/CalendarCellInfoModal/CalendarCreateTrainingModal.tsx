import { Button, Divider, Empty, Modal, Select } from 'antd';
import './CalendarCellInfoModal.scss';
import { useContext, useEffect, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { IGetTrainingListResponse, IGetTrainingsResponse } from '../../types/apiTypes';
import { AppContext } from '../../context/AppContext';
import moment from 'moment';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { CreateTrainingThunk } from '@redux/thunk/TrainingThunk';

interface IProps {
    date: string;
    isModalOpen: boolean;
    trainingsListData: IGetTrainingListResponse[];
    trainingsData: IGetTrainingsResponse[];
    modalPosition: { left: string; top: string };
    closeModal: (type: string) => void;
}

const getTimePeriod = (time: string) => {
    console.log(moment(time, 'DD.MM.YYYY') > moment(), moment(time, 'DD.MM.YYYY'), moment());

    if (moment(time, 'DD.MM.YYYY') > moment()) {
        return false;
    }
    return true;
};

export const CalendarCreateTrainingModal = ({
    date,
    isModalOpen,
    trainingsListData,
    trainingsData,
    modalPosition,
    closeModal,
}: IProps) => {
    const [exercises, setExercises] = useState<JSX.Element[]>([]);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const { openModal, updateAddExercisesData, exercisesData, addExercisesData } =
        useContext(AppContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (exercisesData.length) {
            setExercises(
                exercisesData.map((exercise) => (
                    <div className='training__item'>
                        <span>{exercise.name}</span>

                        <EditOutlined
                            style={{ color: '#2f54eb' }}
                            onClick={() => openModal(CONSTANTS.DRAWER)}
                        />
                    </div>
                )),
            );

            setSaveButtonDisabled(false);
        }
    }, [exercisesData]);

    const options = trainingsListData.map((item) => {
        if (!trainingsData.length) {
            return {
                value: item.name,
                label: item.name,
            };
        } else if (trainingsData.some((trainingObj) => trainingObj.name !== item.name)) {
            return {
                value: item.name,
                label: item.name,
            };
        }
        return [];
    });

    const close = () => {
        closeModal(CONSTANTS.ADD_TRAINING_MODAL);
    };

    const addTraining = (value: string) => {
        setDisabled(false);
        updateAddExercisesData({
            name: value,
            date,
        });
    };

    const saveTraining = () => {
        const request = {
            name: addExercisesData.name,
            date: moment(date, 'DD.MM.YYYY').format('YYYY-MM-DDThh:mm:ss.ms'),
            isImplementation: false,
            exercises: exercisesData,
        };

        dispatch(CreateTrainingThunk(request));
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
                        defaultValue='Выбор типа тренировки'
                        style={{ width: '92%' }}
                        variant={'borderless'}
                        onChange={addTraining}
                        options={options}
                        data-test-id='modal-create-exercise-select'
                    />
                </header>
            }
            mask={false}
            maskClosable={false}
            open={isModalOpen}
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
            width={CONSTANTS.CREATE_TRAINING_MODAL_WIDTH}
            className='modal__title'
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
                        disabled={saveButtonDisabled}
                        onClick={saveTraining}
                    >
                        Сохранить
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
