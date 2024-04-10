import { Badge, BadgeProps, message } from 'antd';
import './TrainingModals.scss';
import CONSTANTS from '@utils/constants';
import { getTrainingColor } from '@utils/getTrainingColor';
import moment from 'moment';
import { getPeriodValue } from '@utils/getPeriod';
import { IGetInviteResponse } from '../../types/apiTypes';
import { CloseOutlined } from '@ant-design/icons';

export const TrainingDetails = ({
    currentTrainingInvite,
    modalPosition,
}: {
    currentTrainingInvite: IGetInviteResponse;
    modalPosition: { left: string; top: string };
}) => {
    message.success({
        duration: 1000,
        icon: <></>,
        style: {
            position: 'absolute',
            left: modalPosition.left,
            top: '4vh',
        },
        content: (
            <div data-test-id='joint-training-review-card'>
                <header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #ccc',
                        paddingBottom: 8,
                        marginBottom: 24,
                    }}
                    className='training-details__modal-header'
                >
                    <Badge
                        color={
                            getTrainingColor(
                                currentTrainingInvite.training.name,
                            ) as BadgeProps['color']
                        }
                        text={
                            <span className='training-details__modal-title'>
                                {currentTrainingInvite.training.name}
                            </span>
                        }
                        style={{ width: 'max-content' }}
                    />
                    <CloseOutlined />
                </header>
                <main className='training-details__modal'>
                    <div className='training-details__info'>
                        <p className='training-details__period'>
                            {getPeriodValue(currentTrainingInvite.training.parameters.period)}
                        </p>
                        <p className='training-details__date'>
                            {moment()
                                .add(currentTrainingInvite.training.parameters.period, 'd')
                                .format(CONSTANTS.DATE_FORMAT)}
                        </p>
                    </div>
                    {currentTrainingInvite.training.exercises.map((exercise) => (
                        <div className='training-details__info'>
                            <p className='training-details__exercise-name'>{exercise.name}</p>
                            <p className='training-details__exercise-params'>
                                {exercise.weight
                                    ? `${exercise.replays} x (${exercise.weight} кг)`
                                    : `${exercise.replays} x (${exercise.approaches})`}
                            </p>
                        </div>
                    ))}
                </main>
            </div>
        ),
    });
};
