import './Header.scss';
import CONSTANTS from '@utils/constants';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';

export const SettingsHeader = () => {
    const router = useAppSelector((state) => state.router);
    const dispatch = useAppDispatch();

    const goBack = () => {
        const previousLocation = router.previousLocations
            ? router.previousLocations[1].location?.pathname
            : undefined;
        dispatch(push(previousLocation as string));
    };

    return (
        <header className='settings-header'>
            <ArrowLeftOutlined onClick={goBack} data-test-id='settings-back' />
            <h4 className='settings-header__title'>Настройки</h4>
        </header>
    );
};
