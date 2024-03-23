import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { useEffect } from 'react';
import { push } from 'redux-first-history';
import './ProfilePage.scss';
import { ProfileWrapp } from '@components/ProfileWrapp/ProfileWrapp';
import { ProfileHeader } from '@components/header/ProfileHeader';

export const ProfilePage = () => {
    const { isAuth } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    return (
        <div className='profile'>
            <ProfileHeader />
            <ProfileWrapp />
        </div>
    );
};
