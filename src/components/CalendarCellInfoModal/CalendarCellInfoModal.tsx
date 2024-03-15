import { Button, Divider, Modal } from 'antd';
import './CalendarCellInfoModal.scss';
import { useContext, useEffect } from 'react';
import CONSTANTS from '@utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { CalendarCreateTrainingModal } from './CalendarCreateTrainingModal';
import { AppContext } from '../../context/AppContext';
import { push } from 'redux-first-history';
import { IGetTrainingsResponse } from '../../types/apiTypes';

interface IProps {
    date: string;
    isModalOpen: boolean;
    JSXContent: JSX.Element;
    trainingsData: IGetTrainingsResponse[];
    modalPosition: { left: string; top: string };
    setOpen: (isModalOpen: boolean) => void;
}

export const CalendarCellInfoModal = ({
    date,
    isModalOpen,
    trainingsData,
    JSXContent,
    modalPosition,
    setOpen,
}: IProps) => {
    const { trainingList } = useAppSelector((state) => state.calendar);
    const { isAddTrainingModalOpen, openModal, closeModal } = useContext(AppContext);
    const dispatch = useAppDispatch();

    const redirect = () => {
        dispatch(push(CONSTANTS.ROUTER__PATH.MAIN__PATH));
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
                className='modal__title'
                footer={
                    <>
                        <Divider />
                        <Button
                            type='primary'
                            className='button__primary'
                            disabled={trainingsData.length === trainingList.length}
                            //? onClick={() => CreateTrainingFail(redirect)}
                            onClick={() => openModal(CONSTANTS.ADD_TRAINING_MODAL)}
                        >
                            {trainingsData.length > 0
                                ? 'Добавить Тренировку'
                                : 'Создать Тренировку'}
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
            />
        </>
    );
};
