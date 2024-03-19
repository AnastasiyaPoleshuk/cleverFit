import { Button, Divider, Modal } from 'antd';
import './CalendarCellInfoModal.scss';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { useAppSelector } from '../../hooks/index';
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

// const getStatus = (key: string) => {
//     switch (key) {
//         case CONSTANTS.TRAINING_TYPE.BACK:
//             return CONSTANTS.TRAINING_COLOR.BACK;
//         case CONSTANTS.TRAINING_TYPE.CHEST:
//             return CONSTANTS.TRAINING_COLOR.CHEST;
//         case CONSTANTS.TRAINING_TYPE.HANDS:
//             return CONSTANTS.TRAINING_COLOR.HANDS;
//         case CONSTANTS.TRAINING_TYPE.LEGS:
//             return CONSTANTS.TRAINING_COLOR.LEGS;
//         case CONSTANTS.TRAINING_TYPE.STRENGTH:
//             return CONSTANTS.TRAINING_COLOR.STRENGTH;
//         default:
//             break;
//     }
// };

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

    // const createTrainingthList = () => {
    //     return (
    //         <ul className='events'>
    //             {listData.length
    //                 ? listData.map((item, index) => (
    //                       <li key={item.key} className='trainings__list-item'>
    //                           <Badge
    //                               color={getStatus(item.key) as BadgeProps['color']}
    //                               text={item.name}
    //                           />

    //                           {isModalData ? (
    //                               <EditOutlined
    //                                   style={{ color: '#2f54eb' }}
    //                                   //   onClick={() =>
    //                                   //       setEditExerciseData({ value, name: item.name })
    //                                   //   }
    //                                   onClick={() => editExercisesButtonClick(value, item.name)}
    //                                   data-test-id={`modal-update-training-edit-button${index}`}
    //                               />
    //                           ) : (
    //                               ''
    //                           )}
    //                       </li>
    //                   ))
    //                 : ''}
    //         </ul>
    //     );
    // }

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
