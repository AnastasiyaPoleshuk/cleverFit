import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { GetTrainingInfoThunk } from '@redux/thunk/TrainingThunk';
import { UserSelector } from '@utils/StoreSelectors';
import CONSTANTS from '@utils/constants';
import { useEffect } from 'react';
import { push } from 'redux-first-history';
import './AchievementsPage.scss';
import { AchievementsWrapp } from '@components/AchievementsWrapp/AchievementsWrapp';

export const AchievementsPage = () => {
    const { isAuth, accessToken } = useAppSelector(UserSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        } else {
            dispatch(GetTrainingInfoThunk(accessToken));
        }
    }, [isAuth]);

    return (
        <div className='achievements'>
            <AchievementsWrapp />
        </div>
    );
};
