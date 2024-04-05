import './ResultPage.scss';
import { Loader } from '@components/Loader/Loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { UserSelector, changePasswordSelector } from '@utils/StoreSelectors';
import { Outlet } from 'react-router-dom';

export const ResultPage = () => {
    const { isLoading: isLoadingUserState } = useAppSelector(UserSelector);
    const { isLoading } = useAppSelector(changePasswordSelector);
    return (
        <div className='result-page'>
            <div className='result__box'>
                <Outlet />
            </div>
            {(isLoadingUserState || isLoading) && <Loader />}
        </div>
    );
};
