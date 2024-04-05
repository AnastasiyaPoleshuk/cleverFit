import './Header.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { routerSelector } from '@utils/StoreSelectors';

export const SettingsHeader = () => {
    const router = useAppSelector(routerSelector);
    const dispatch = useAppDispatch();

    const goBack = () => {
        const previousLocation = router.previousLocations?.[1].location?.pathname;
        dispatch(push(previousLocation as string));
    };

    return (
        <header className='settings-header'>
            <ArrowLeftOutlined onClick={goBack} data-test-id='settings-back' />
            <h4 className='settings-header__title'>Настройки</h4>
        </header>
    );
};
