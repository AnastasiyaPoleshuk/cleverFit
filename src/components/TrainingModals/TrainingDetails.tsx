import { Badge, BadgeProps, message } from 'antd';
import './TrainingModals.scss';
import CONSTANTS from '@utils/constants';
import { getTrainingColor } from '@utils/getTrainingColor';
import moment from 'moment';
import { getPeriodValue } from '@utils/getPeriod';
import { IGetInviteResponse } from '../../types/apiTypes';

export const TrainingDetails = ({
    currentTrainingInvite,
}: {
    currentTrainingInvite: IGetInviteResponse;
}) => {
    message.success({
        duration: 1000,
        icon: <></>,
        content: (
            <div data-test-id='joint-training-review-card'>
                <header
                    style={{
                        borderBottom: '1px solid #ccc',
                        paddingBottom: 8,
                        marginBottom: 24,
                    }}
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
