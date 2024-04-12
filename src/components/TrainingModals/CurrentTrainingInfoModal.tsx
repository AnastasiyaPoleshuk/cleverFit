import { ArrowLeftOutlined } from '@ant-design/icons';
import CONSTANTS from '@utils/constants';
import { Modal, Divider, Button, Empty } from 'antd';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { getTrainingColor } from '@utils/getTrainingColor';
import { ITrainingExercises } from '../../types/storeTypes';
import './TrainingModals.scss';

type IProps = {
    isModalOpen: boolean;
    modalPosition: { left: string; top: string };
    close: () => void;
};

const getExercisesList = (exercises: ITrainingExercises[]) => {
    return exercises.map((item) => (
        <p className='exercises-list__item' key={item.name}>
            {item.name}
        </p>
    ));
};

export const CurrentTrainingInfoModal = ({ modalPosition, isModalOpen, close }: IProps) => {
    const { openModal, currentTraining } = useContext(AppContext);

    return (
        <Modal
            title={
                <header className='modal__header'>
                    <ArrowLeftOutlined onClick={close} style={{ marginRight: 12 }} />
                    <span>{currentTraining.name}</span>
                    <Divider
                        style={{
                            border: `2px solid ${getTrainingColor(currentTraining.name)}`,
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                        }}
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
                    alignItems: 'flex-start',
                },
            }}
            className='modal__create-training'
            footer={
                <>
                    <Divider />
                    <Button
                        className='button__primary'
                        onClick={() => openModal(CONSTANTS.CREATE_TRAINING_DRAWER)}
                    >
                        Добавить упражнения
                    </Button>
                </>
            }
        >
            {currentTraining.exercises?.length ? (
                getExercisesList(currentTraining.exercises)
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
