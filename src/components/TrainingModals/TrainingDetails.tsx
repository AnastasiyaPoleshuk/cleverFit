import { Badge, BadgeProps, Modal } from 'antd';
import './TrainingModals.scss';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import CONSTANTS from '@utils/constants';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTrainingColor } from '@utils/getTrainingColor';
import moment from 'moment';
import { getPeriodValue } from '@utils/getPeriod';

export const TrainingDetails = ({
    isTrainingDetailsModalOpen,
}: {
    isTrainingDetailsModalOpen: boolean;
}) => {
    const { closeModal, currentTrainingInvite } = useContext(AppContext);
    const dispatch = useAppDispatch();

    const close = () => {
        closeModal(CONSTANTS.TRAINING_DETAILS_MODAL);
    };

    return (
        <Modal
            open={isTrainingDetailsModalOpen}
            destroyOnClose={true}
            closable={true}
            onCancel={close}
            title={
                <Badge
                    color={
                        getTrainingColor(currentTrainingInvite.training.name) as BadgeProps['color']
                    }
                    text={<h4 className=''>{currentTrainingInvite.training.name}</h4>}
                    style={{ width: 'max-content' }}
                />
            }
            styles={{
                header: {
                    border: 1,
                },
                body: {
                    // height: 91,
                    // display: 'flex',
                    // flexDirection: 'column',
                    // justifyContent: 'center',
                    // alignItems: 'flex-start',
                },
            }}
            footer={null}
            data-test-id='joint-training-review-card'
            className='training-details__modal'
        >
            <div className='training-details__info'>
                <p className='training-details__period'>
                    {getPeriodValue(currentTrainingInvite.training.parameters.period)}
                </p>
                <p className='training-details__date'>
                    {moment(currentTrainingInvite.createdAt).format(CONSTANTS.DATE_FORMAT)}
                </p>
            </div>
            {currentTrainingInvite.training.exercises.map((exercise) => (
                <div className='training-details__info'>
                    <p className='training-details__exercise-name'>{exercise.name}</p>
                    <p className='training-details__exercise-params'>
                        {exercise.weight
                            ? `${exercise.replays} X (${exercise.weight} кг)`
                            : `${exercise.replays} X (${exercise.approaches})`}
                    </p>
                </div>
            ))}
        </Modal>
    );
};
