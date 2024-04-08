import { Button } from 'antd';
import './Components.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { GetUsersForJoinTrainingThunk } from '@redux/thunk/TrainingThunk';
import { useEffect } from 'react';
import { UserSelector, trainingSelector } from '@utils/StoreSelectors';

export const JoinTrainingPreview = ({
    changePreviewState,
}: {
    changePreviewState: (data: boolean) => void;
}) => {
    const { isGetUsersForJoinTrainingSuccess } = useAppSelector(trainingSelector);
    const { accessToken } = useAppSelector(UserSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isGetUsersForJoinTrainingSuccess) {
            changePreviewState(false);
        }
    }, [isGetUsersForJoinTrainingSuccess]);

    const goToFindPeople = (withType: boolean) => {
        withType
            ? dispatch(GetUsersForJoinTrainingThunk({ trainingType: 'legs', accessToken }))
            : dispatch(GetUsersForJoinTrainingThunk({ trainingType: '', accessToken }));
    };
    return (
        <section className='preview__block'>
            <h2 className='preview__block-title'>
                Хочешь тренироваться с тем, кто разделяет твои цели и темп? Можешь найти друга для
                совместных тренировок среди других пользователей.
            </h2>
            <p className='preview__block-subtitle'>
                Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень
                и вид тренировки, и мы найдем тебе идеального спортивного друга.
            </p>

            <div className='preview__block-button__wrapp'>
                <Button className='preview__block-button' onClick={() => goToFindPeople(false)}>
                    Случайный выбор
                </Button>
                <Button className='preview__block-button' onClick={() => goToFindPeople(true)}>
                    Выбор друга по моим тренировкам
                </Button>
            </div>
        </section>
    );
};
