import { Button, Divider, Modal } from 'antd';
import './CalendarCellInfoModal.scss';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { CalendarCreateTrainingModal } from './CalendarCreateTrainingModal';
import { AppContext } from '../../context/AppContext';
import { IGetTrainingsResponse } from '../../types/apiTypes';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

interface IProps {
    date: string;
    isModalOpen: boolean;
    JSXContent: JSX.Element;
    trainingsData: IGetTrainingsResponse[];
    modalPosition: { left: string; top: string };
    isAddTrainingDisabled: boolean;
    setOpen: (isModalOpen: boolean) => void;
}

export const CalendarCellInfoModal = ({
    date,
    isModalOpen,
    trainingsData,
    JSXContent,
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
        if (trainingsData.length && moment(date, 'DD.MM.YYYY') > moment()) {
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

    return (
        <>
            <Modal
                title={`Тренировки на ${date}`}
                mask={false}
                open={isModalOpen}
                onCancel={() => setOpen(false)}
                style={{ position: 'absolute', ...modalPosition }}
                width={CONSTANTS.CREATE_TRAINING_MODAL_WIDTH}
                destroyOnClose={true}
                className='modal__title'
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
                {JSXContent}
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
