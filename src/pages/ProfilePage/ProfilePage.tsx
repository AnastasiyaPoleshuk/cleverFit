import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { useEffect } from 'react';
import { push } from 'redux-first-history';
import './ProfilePage.scss';
import { Header } from '@components/header/Header';
import { ProfileWrapp } from '@components/ProfileWrapp/ProfileWrapp';

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
            <Header />
            <ProfileWrapp />
        </div>
    );
};
