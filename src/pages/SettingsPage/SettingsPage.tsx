import { SettingsHeader } from '@components/header/SettingsHeader';
import './SettingsPage.scss';
import { SettingsWrapp } from '@components/SettingsWrapp/SettingsWrapp';
import { TariffDrawer } from '@components/TariffDrawer/TariffDrawer';
import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { useContext, useEffect } from 'react';
import { push } from 'redux-first-history';
import { ChangeTariffInfoModal } from '@components/ChangeTariffInfoModal/ChangeTariffInfoModal';
import { AppContext } from '../../context/AppContext';
import { UserSelector } from '@utils/StoreSelectors';

export const SettingsPage = () => {
    const { isAuth } = useAppSelector(UserSelector);
    const { isChangeTariffInfoModalOpen } = useContext(AppContext);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    return (
        <div className='settings'>
            <SettingsHeader />
            <SettingsWrapp />
            <TariffDrawer />
            <ChangeTariffInfoModal isModalOpen={isChangeTariffInfoModalOpen} />
        </div>
    );
};
